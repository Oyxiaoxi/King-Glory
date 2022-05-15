// Package references
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// Custom Method Export
import { AxiosCanceler } from './helper/axiosCancel'
import { checkStatus } from './helper/checkStatus'
import type { ResultData } from './interface'
import { ResultEnum } from '~/enums/httpEnum'
import { showFullScreenLoading, tryHideFullScreenLoading } from '~/config/serviceLoading'
import { GlobalStore } from '~/store'
import router from '~/router'

const axiosCanceler = new AxiosCanceler()
const globalStore = GlobalStore()

const config = {
  // Interface default request address
  baseURL: import.meta.env.VITE_API_URL as string,
  // Set timeout time (10s)
  timeout: ResultEnum.TIMEOUT as number,
  // Carrying credentials is allowed when crossing domains
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // Instantiation axios
    this.service = axios.create(config)

    // @description Request Interceptor
    // Client sends request -> [Request Interceptor] -> Server
    // token verification (JWT): accept token from server, store in (vuex or pinia)/local storage

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Add the current request to the pending
        axiosCanceler.addPending(config)
        showFullScreenLoading()
        const token: string = globalStore.token
        return { ...config, headers: { 'X-CSRF-Token': token } }
      },
      (error: AxiosError) => {
        Promise.reject(error)
      },
    )

    // @description Response Interceptor
    // Server for return message -> [intercept unified processing] -> Client JS gets the message
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        axiosCanceler.removePending(config)
        tryHideFullScreenLoading()
        // Login disabled (code == 599)
        if (data.code === ResultEnum.OVERDUE) {
          ElMessage.error(data.msg)
          globalStore.setToken('')
          router.replace({
            path: '/login',
          })
          return Promise.reject(data)
        }
        // Global error message interception (to prevent the return of a stream of data without a code when downloading a file, and a direct error message)
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // Successful return
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // Depending on the error status code of the response, different processing is done
        if (response)
          return checkStatus(response.status)
        // Server results are not returned (possible server error possible client disconnection), disconnection processing: can jump to the disconnection page
        if (!window.navigator.onLine)
          return router.replace({ path: '/500' })
        return Promise.reject(error)
      },
    )
  }

  // Encapsulation of common request methods
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
