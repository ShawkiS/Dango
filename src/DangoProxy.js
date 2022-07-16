import { caller } from 'postmsg-rpc'

const callbackOrThrow = (callback, errMsg) => {
  if (callback) {
    callback(errMsg)
  } else {
    throw errMsg instanceof Error ? errMsg : new Error(errMsg)
  }
}


class DangoProviderProxy {
  constructor (postMessage) {
    this.postMessage = postMessage;
    this.sendRPC = caller('send', {postMessage: this.postMessage})
  }

  async send (req, origin, callback) {
    if (typeof origin === 'function') {
      callback = origin
      origin = null
    }

    try {
      const res = JSON.parse(await this.sendRPC(req))
      if (callback) callback(undefined, res)
      return res
    } catch (err) {
      callbackOrThrow(callback, err)
      return
    }
  }
}

export default DangoProviderProxy
