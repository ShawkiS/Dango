export const str2ab = (str) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const getIframeParentUrl = () => {
    let url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;

           url = url.replace(/.+\/\/|www.|\..+/g, '');
           
           return url.substring(0, url.length - 1);
}

export const verifyCast = (cast) => {
    if (Object.hasOwn(cast, 'type') 
        &&
       Object.hasOwn(cast, 'publishedAt') 
        && 
       Object.hasOwn(cast, 'sequence') 
       &&
      Object.hasOwn(cast, 'username') 
       &&
      Object.hasOwn(cast, 'address') 
       &&
      Object.hasOwn(cast, 'prevMerkleRoot') 
      &&
      Object.hasOwn(cast, 'data') 
       )
      {
          return true;
       }
  
    else {
      return false;
    }
  }