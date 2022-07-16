import DangoService from 'dango/DangoService'
import {useEffect, useRef, useState} from 'react'
import { classNames, getIframeParentUrl } from '../../src/utils';
import ReactLoading from 'react-loading';
import { giveAutoSignPermission, setDomainPermission } from 'dango/services/auth';
import { signCast } from 'dango/services/crypto';
import { XIcon } from '@heroicons/react/outline';

const delay = ms => new Promise(res => setTimeout(res, ms));


export default function Home() {
  const ref = useRef();
  let dnservice;

  const [message, setMessage] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [infomsg, setInfomsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [call, setCall] = useState();
  const [linkProps, setLinkProps] = useState({});
  const [castText, setCastText] = useState();
  const [cast, setCast] = useState();

  useEffect(() => { 
    async function get() { 
      dnservice = new DangoService();
      await dnservice.start(login, connect, sign, onClose);
    }
    get();
  }, []);

  const login = async () => { 
    setLoading(false)
    setCall('login')
    setMessage('This site want to read your Farcaster account data. Do you want to import your Farcaster account?');
    setButtonLabel('Import account');
    setInfomsg('This site uses Dango, learn more here.');
    setLinkProps({target:  "_blank", href: 'http://localhost:3000/setup'});
  }

  const connect = () => { 
    setLoading(false)
    setCall('connect')
    setMessage('This site want to access your Farcaster account data.');
    setButtonLabel('Approve');
    setInfomsg('This site uses Dango, learn more here.');
  }

  const sign = (cast) => { 
    setLoading(false);
    setCall('sign')
    setCastText(cast.data.text)
    setMessage('This site want you to sign a cast with this message');
    setButtonLabel('Sign cast');
    setInfomsg('This site uses Dango, learn more here.');
    setCast((cast));
  }

  const onClose = () => { 
    dnservice.hideIframe();
  }

  const onClick = async () => {
    dnservice = new DangoService();
    dnservice.start(login, connect, sign, onClose);

    if(call === 'login') { 
    setActionLoading(true);
    }

    if (call === 'connect') { 
      const domain = getIframeParentUrl();
      setActionLoading(true);
      setDomainPermission(domain, false)
      await delay(1000)
      setActionLoading(false);
      await dnservice.hideIframe()
    }

    if (call === 'sign') { 
      setActionLoading(true);

      if (ref.current.checked) { 
        const domain = getIframeParentUrl();
        
        await giveAutoSignPermission(domain);
      }

      const signature = await signCast(cast);
      await delay(1000)
      setActionLoading(false);
      localStorage.setItem('signature', JSON.stringify(signature));
      window.dispatchEvent( new Event('storage') )
    }
  
  }

  return (
  <>
  <div className={classNames("transition-opacity duration-500 ease-out relative bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6", !loading ? 'opacity-1' : 'opacity-0' )}>
<div className="sm:flex sm:items-start">
  <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
    <h3 style={{color: '#8a63d2'}} className="text-md text-left font-semibold leading-6 text-gray-700">Dango</h3>
    <div className="sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

    <div className="mt-3">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
   { call === 'sign' && !actionLoading && <div className="mt-5 text-center">
      <code className="text-sm text-gray-500">{castText}</code>
    </div>}

  </div>
</div>
<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
{call === 'sign' && !actionLoading && <div className="relative flex items-start mb-2">
        <div className="flex items-center h-4">
          <input
            ref={ref}
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="focus:ring-indigo-500 h-3 w-3 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-1 text-xs">
          <span id="comments-description" className="text-gray-500">
           Give this site auto-signing permission.
          </span>
        </div>
      </div>
}
{!actionLoading && <a {...linkProps}>
  <button onClick={() => onClick()}  style={{backgroundColor: "#8a63d2"}} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">{buttonLabel}</button>
  </a>}

{actionLoading && <div className='ml-44'>
  <ReactLoading type='spin' color='black' height={40} width={40} />
  </div>}

</div>
<div className="mt-5">
<p className="text-center text-xs text-gray-500">{infomsg}</p>
</div>
</div>
  </>
  )
}