/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import qs from 'qs'

import { isFunction } from '~/utils/is'

let pendingMap = new Map<string, Canceler>()

// Serialisation parameters
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')

export class AxiosCanceler {
  // @description: Add Request
  // @param {Object} config
  addPending(config: AxiosRequestConfig) {
    // Check for cancellation of previous requests before the request starts
    this.removePending(config)

    config.cancelToken
			= config.cancelToken
			|| new axios.CancelToken((cancel) => {
			  if (!pendingMap.has(URL)) {
			    // If the current request does not exist in pending, add it to the map
			    pendingMap.set(URL, cancel)
			  }
			})
  }

  // @description: Remove Request
  // @param {Object} config
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      // If the current request identifier exists in pending, the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url)
      cancel && cancel()
      pendingMap.delete(url)
    }
  }

  // @description: Remove All Pending
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  // @description: Reset Pending
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
