import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare type VtpHttpRequestConstructorOptions = {
    baseUrl?: string;
    axiosInstance?: AxiosInstance;
    proceedKey?: string;
    dataKey?: string;
};
export interface VtpHttpErrorResponse {
    isKnown: boolean;
    data?: Record<string, any>;
    response?: AxiosResponse;
    error?: Error | {
        response: AxiosResponse;
    };
}
export declare class VtpHttpRequest {
    axios: AxiosInstance;
    proceedKey: string;
    dataKey: string;
    constructor(options?: VtpHttpRequestConstructorOptions);
    isXmlRequest(): this;
    getFrom(url: string, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<unknown>;
    postTo(url: string, data?: any, options?: AxiosRequestConfig): Promise<unknown>;
    patch(url: string, data?: any, options?: AxiosRequestConfig): Promise<unknown>;
    sendVia(method: string, url: string, data?: any, options?: AxiosRequestConfig): Promise<unknown>;
    promisifyRequest(req: Promise<AxiosResponse>): Promise<unknown>;
}
export default VtpHttpRequest;
