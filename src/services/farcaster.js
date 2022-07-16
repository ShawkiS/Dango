import axios from 'axios';

export const isFarcasterUser = async (address) => {
  const result = axios.get(`https://guardian.farcaster.xyz/origin/directory/${address}`).then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
  
  return result;
}

export const getUserDirectory = async (address) => { 
  const result = await (await axios.get(`https://guardian.farcaster.xyz/origin/directory/${address}`)).data;
  return result;
}