import DangoProviderProxy from './DangoProxy.js'
import { expose } from 'postmsg-rpc'

const DANGO_IFRAME_URL = 'http://localhost:3000/'
const HIDE = 'display: none; position: fixed; width:0; height:0; border:0; border:none !important';

const hide = (iframe) => () => iframe.style = HIDE;

const display = (iframe) => { 
  const mobile = false; 
  iframe.style = `${'border:none border:0; z-index: 500; position: fixed; max-width: 100%;'} width: ${'440px'}; height: ${'245px'}; ${mobile ? `bottom: 0px; left: 0px;`: `top: 10px; right: 10px`}`
}

class DangoConnect {

  constructor () {
    this.iframe = document.createElement('iframe');
    this.iframe.src = DANGO_IFRAME_URL
    this.iframe.style = HIDE;
    this.iframe.allowTransparency = true
    this.iframe.frameBorder = 0
    
    this.iframeLoadedPromise = new Promise((resolve, reject) => {
      this.iframe.onload = () => { resolve() }
    })
    document.body.appendChild(this.iframe);
    this.postMessage = this.iframe.contentWindow.postMessage.bind(this.iframe.contentWindow);
    this.proxy = new DangoProviderProxy(this.postMessage);
  }

  _display() {
    expose('display', display(this.iframe))
    expose('hide', hide(this.iframe))
  }

  async connect() { 
    this._display();
    await this.iframeLoadedPromise;
    const result = await this.proxy.sendRPC({method: 'connect'});

    return result;
  }

  async getAccountData() { 
    await this.iframeLoadedPromise;
    const result = await this.proxy.sendRPC({method: 'getAccountData'});
    return result;
  }

  async signCast(cast) { 
    this._display();
    await this.iframeLoadedPromise;
    const result = await this.proxy.sendRPC({method: 'sign', cast});
    return result;
  }

}

export default DangoConnect;