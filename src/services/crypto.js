import { Wallet } from 'ethers';
import lf from 'localforage';
import { str2ab } from '../utils';
import { isFarcasterUser } from './farcaster';
import {keccak256}  from "@ethersproject/keccak256";
const { toUtf8Bytes } = require("@ethersproject/strings");

const _createWCKey = async () => {
    const key = await window.crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
        lf.setItem('key', key)
        return key;
}

export const importWallet = async (seedphrase) => {
        const key = await _createWCKey();
    
        const account = Wallet.fromMnemonic(seedphrase, `m/44'/60'/0'/0/1230940800`);
        const address = account.address 
        const isFcUser = await isFarcasterUser(address);
        if(isFcUser) { 

        lf.setItem('address', address)

        const privateKey = account.privateKey;
        
        
        const enc = new TextEncoder();
    
        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        lf.setItem('iv', iv)

       const encryptedPrivateKey = await window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv,
            },
            key, 
            enc.encode(privateKey)
        );

        lf.setItem('ec', window.btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedPrivateKey))));
    
        return true;
    } else {
        return false;
    }
}

export const signCast = async (cast) => {  
    const key = await lf.getItem('key');
    const ec = await lf.getItem('ec');
    const iv = await lf.getItem('iv');

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        key, 
        str2ab(window.atob(ec))
    );

    const dec = new TextDecoder();

   const signer = new Wallet(dec.decode(decrypted));

   const merkleRoot = keccak256(toUtf8Bytes(JSON.stringify(cast)));

   const signedCast = {
    body: cast,
    merkleRoot,
    signature: await signer.signMessage(merkleRoot),
  };

   return signedCast;
}