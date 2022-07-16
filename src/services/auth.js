  import localforage from 'localforage';

  export const isloggedIn = async () => {
      const ec = await localforage.getItem('ec');
      const iv = await localforage.getItem('iv');
      const key = await localforage.getItem('key');

      if (ec && iv && key) { 
        return true;
      } else { 
        return false;
      }
  }

  export const getDomainPermission = async (domain) => {
    const domainPermissions = await localforage.getItem('domains');
    if (domainPermissions) { 
    return domainPermissions.filter(x => x.domain === domain)[0];
  }

}

  export const setDomainPermission = async (domain, isAutoSigning) => { 
  const domainPermissions = await localforage.getItem('domains');
 
  if (domainPermissions) { 
      const dps = domainPermissions.filter(x => x.domain === domain);
   
    if(dps.length === 0) { 
        domainPermissions.push({domain, isAutoSigning});
        localforage.setItem('domains', domainPermissions)

      } else {
        return 'domain already exist';
      }
  } 
  
  else {
      localforage.setItem('domains', [{domain, isAutoSigning}])
  }
  
}

  export const getAllDomainsPermissions = async () => {
  const all = await localforage.getItem('domains');
  return all;
  }

  export const revokeDomainPermission = async (domain) => {
      const domainPermissions = await localforage.getItem('domains');
    
      await localforage.setItem('domains', domainPermissions.filter(dp => dp.domain != domain))
  }

  export const giveAutoSignPermission = async (domain) => {
        const domainPermissions = await localforage.getItem('domains');
        const newarr = domainPermissions.filter(dp => dp.domain != domain);
      
        newarr.push({domain, isAutoSigning: true})
        await localforage.setItem('domains', newarr)
  }
