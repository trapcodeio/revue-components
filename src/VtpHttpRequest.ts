import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export type VtpHttpRequestConstructorOptions = {
    baseUrl?: string,
    axiosInstance?: AxiosInstance,
    proceedKey?: string,
    dataKey?: string
};

export interface VtpHttpErrorResponse {
    isKnown: boolean
    data?: Record<string, any>
    response?: AxiosResponse
    error?: Error | { response: AxiosResponse }
}

export class VtpHttpRequest {
    axios!: AxiosInstance;
    proceedKey = 'proceed';
    dataKey = 'data';

    constructor(options?: VtpHttpRequestConstructorOptions) {
        if (options?.axiosInstance) {
            this.axios = options.axiosInstance;
        } else {
            this.axios = axios.create({
                baseURL: options?.baseUrl,
            })
        }

        if (options?.dataKey) this.dataKey = options.dataKey;
        if (options?.proceedKey) this.proceedKey = options.proceedKey;
    }

    isXmlRequest() {
        this.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        return this;
    }

    private static __getQueryConfig(query?: Record<string, any>, options?: AxiosRequestConfig) {
        let config = options || {};
        if (query && !config.params) {
            config.params = query;
        }

        return config;
    }

    get<T = any>(url: string, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<T> {
        return this.promisifyRequest(
            this.axios.get(url, VtpHttpRequest.__getQueryConfig(query, options))
        );
    }


    delete<T = any>(url: string, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<T> {
        return this.promisifyRequest(
            this.axios.delete(url, VtpHttpRequest.__getQueryConfig(query, options))
        );
    }


    post<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.promisifyRequest(
            this.axios.post(url, data, options)
        );
    }

    patch<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.sendVia('patch', url, data, options);
    }

    sendVia<T>(method: string, url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
        return this.promisifyRequest(
            // @ts-ignore
            this.axios[method](url, data, options)
        );
    }

    promisifyRequest(req: Promise<AxiosResponse>): Promise<any> {
        return new Promise((resolve, reject) => {
            req.then((response) => {
                if (response && typeof response.data === "object") {
                    const res = response.data;
                    const hasProceed = res.hasOwnProperty(this.proceedKey) && res.hasOwnProperty(this.dataKey);

                    if (hasProceed && res[this.proceedKey]) {
                        return resolve(res.data);
                    } else {
                        return reject(hasProceed ? {
                            isKnown: true,
                            data: res.data,
                        } : {
                            isKnown: false,
                            data: res
                        });
                    }
                }

                const vtpError: VtpHttpErrorResponse = {
                    isKnown: false,
                    data: response.data,
                }

                return reject(vtpError);
            }).catch((error) => {
                const vtpError: VtpHttpErrorResponse = {
                    isKnown: false,
                }

                if (error.response && typeof error.response.data === "object") {
                    const result: any = error.response.data;
                    if (result.hasOwnProperty(this.proceedKey) && result.hasOwnProperty(this.dataKey)) {
                        vtpError.data = result.data;
                        vtpError.isKnown = true
                    } else {
                        vtpError.response = error.response
                    }
                } else {
                    vtpError.error = error;
                }

                reject(vtpError);
            })
        })
    }
}

export default VtpHttpRequest;