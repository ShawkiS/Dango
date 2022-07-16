import { expose, caller } from 'postmsg-rpc'
import { setDomainPermission, getDomainPermission } from './services/auth';
import { signCast } from './services/crypto';
import { isloggedIn } from './services/auth';
import { getUserDirectory } from './services/farcaster';
import localforage from 'localforage';
import { getIframeParentUrl, verifyCast } from './utils';

const Url = require('url-parse');

class DangoService {

  constructor () {
    this.display = caller('display')
    this.hide = caller('hide')
  }

   start(login, connect, sign, onClose) {
    this.login = login;
    this.connect = connect;
    this.sign = sign;
    this.onClose = onClose;
    expose('send', this.providerRelay.bind(this), {postMessage: window.parent.postMessage.bind(window.parent)});
    }
  
   async displayIframe() {
    return this.display()
  }

   async hideIframe() {
    const root = document.getElementById('__next').innerHTML = ``;
    if (root) root.innerHTML = ``
    return this.hide()
  }

  async providerRelay(message) {
    const domain = new Url(document.referrer).host;
    const domainPermission = await getDomainPermission(domain);

    const responsePromise = new Promise(async (resolve, reject) => {
      if (message.method === 'connect') {
        const isLogin = await isloggedIn();

        if (!isLogin) { 
          let result;
          let loadingFlag = false;

          await this.login();

          window.addEventListener("storage", async () => {
            const isLogin = localStorage.getItem('isLogin');
            const isError  = localStorage.getItem('isError');
      
            if(isLogin) { 
              result = true;
            } 

            if (isError) { 
              result = false;
            }
            
            loadingFlag = true;
         });

         const checkInterval = setInterval(async function(){
          if(!loadingFlag) return;
          clearInterval(checkInterval);
          setDomainPermission(getIframeParentUrl(), false);
          localStorage.removeItem("isError");
          document.getElementById('__next').innerHTML = ``
          resolve(result)          
        }, 1000);

        } else {
          this.connect();
        }
      }

      if (message.method === 'getAccountData') { 
        if (domainPermission) { 
          const result = await getUserDirectory(await localforage.getItem('address'));
          resolve(result);
        }
        else {
          resolve('Please use .coneect() first to get access to the user account');
        }
      }

      if (message.method === 'sign') { 
        if (domainPermission) {
        let result;

        if (verifyCast(message.cast)) {
        if(domainPermission.isAutoSigning) { 
          const signature = await signCast(message.cast);
          resolve(signature);   
        } else { 
          let loadingFlag = false;
          window.addEventListener("storage", async () => {
            const signature = localStorage.getItem('signature');
            const isError  = localStorage.getItem('isError');

      
            if(signature) { 
              result = signature;
            } 

            if (isError) { 
              result = false;
            }
            
            loadingFlag = true;
            await this.hideIframe();
         });
          this.sign(message.cast);
          


         const checkInterval = setInterval(function() {
          if(!loadingFlag) return;
          clearInterval(checkInterval);
          setDomainPermission(domain, false);
          localStorage.removeItem("isError");
          localStorage.removeItem("singture");
          resolve(result)          
        }, 1000);
         
        }
      } else { 
        resolve('You can only ask for cast singtures.');
      }
    } else {
      resolve('Please use .coneect() first.');
    }
      } else { 
        resolve()
      }
    })

    return JSON.stringify(await responsePromise);
  }
}

export default DangoService;