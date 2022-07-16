import { useEffect, useRef, useState } from 'react'
import { importWallet } from 'dango/services/crypto'
import { isloggedIn } from 'dango/services/auth'
import { utils } from 'ethers';
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading';


export default function Setup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState();

  const router = useRouter();
  const ref = useRef();

  const login = async () => { 
    setLoading(true)
    const seedphrase = ref.current.value;
    if (utils.isValidMnemonic(seedphrase)) { 
    const result = await importWallet(seedphrase);
    if(result) { 
      setError(undefined);
      localStorage.setItem('isLogin', true);
      setLoading(false);
      setSuccess(true);
    } else { 
            setLoading(false);
            setError(`There's no Farcaster account registered for your address :(`)
    }

  } else { 
      setError('This not a valid seedphrase!')
  }
  }
  
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
      localStorage.setItem('isError', true)
  });

  
    async function get() {
      if ((await isloggedIn())) {
        router.push('/dashboard')
      } else { 
        setLoading(false)
      }
    }

    get();
    
  },[])


  return (
   <div className="flex flex-col items-center h-screen ">
  <div className="flex flex-col items-center pt-3 flex-grow w-4/5 justify-center mb-40">

{!loading && !success && <> <h1 style={{color: '#8a63d2'}} className='text-gradient text-3xl font-semibold'>
  Import your Farcaster account with Secret Recovery Phrase
    </h1>
    <p className='text-gray-800 mt-2 text-md'>We'll never have access to your secret recovery phrase. It'll be encrypted and stored on your device.</p>
    <div
      className="flex w-2/5 mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md 
  border border-gray-200 px-5 py-1 items-center sm:max-w-xl lg:max-w-2xl justify-between"
    >
      <input
      ref={ref}
      type='password'
     className="flex-grow focus:outline-none border-none border-transparent focus:border-transparent focus:ring-0"
      />
    </div>
    <p className='mt-2 text-md text-red-600'>{error}</p> 

    <div className="flex flex-col w-1/2 space-y-2 justify-center mt-6 sm:space-y-0 sm:flex-row sm:space-x-4 font-Ubuntu">

      <button onClick={() => login()} style={{backgroundColor: '#8a63d2'}} className="btn px-10 py-1 text-lg bg-black text-white">
        <a>Import</a>
      </button>

    </div>
    </>} {loading &&   <ReactLoading type='spin' color='black' height={40} width={40} />}

    {success && 
    <>You've been logged-in, you can close the window.</>
    }

  </div>

</div>
  );
}

