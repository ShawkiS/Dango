import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
} from '@heroicons/react/solid'
import {getAllDomainsPermissions, revokeDomainPermission } from 'dango/services/auth'
import { getUserDirectory } from 'dango/services/farcaster'
import localforage from 'localforage'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const [apps, setApps] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    async function get() { 
    setApps(await getAllDomainsPermissions());

    const address = await localforage.getItem('address');
    const user = await getUserDirectory(address);
    setUser(user)
    user.address = address;
    setLoading(false);
}

    get();

  },[]);


  const revokeAccess = async (domain) => {
    await revokeDomainPermission(domain);
    setApps([...apps.filter(a => a.domain !== domain)]);
  }


  return ( 
   <>
   {!loading && <div className="min-h-full">

        <header className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="flex-1 min-w-0">
              <img className='rounded-full w-20 ml-7' src="https://pbs.twimg.com/profile_images/1411344821906776066/ZUx9hjZm_400x400.jpg" />
              <h1 className="mt-2 text-xl font-base leading-7 text-gray-900 sm:text-xl sm:truncate">
                {user.body.displayName}
              </h1>
              <p className="mt-1 text-sm font-base text-gray-900  sm:truncate">
              {user.address}
              </p>
     
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              {/* Dropdown */}
              <Menu as="div" className="ml-3 relative sm:hidden">
                <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  More
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Connected Apps</h2>

   
            </div>

            <ul role="list" className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
              {apps.map((app) => (
                <li>
                    <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="mt-3 text-sm font-medium text-purple-600 truncate">{app.domain}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => revokeAccess(app.domain)}
      >
        Revoke Access
      </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>

     
          </div>
        </main>
      </div>}

    {loading && <p>loading...</p>} 
    </>
    
  )
}
