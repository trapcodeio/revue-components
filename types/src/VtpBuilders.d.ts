import VtpHttpRequest, { VtpHttpErrorResponse } from "./VtpHttpRequest";
import { AxiosRequestConfig } from "axios";
export declare type VtpRequest = {
    name?: string;
    url: string;
    query?: Record<string, any>;
    config?: AxiosRequestConfig;
};
export declare type StringOrVtpRequest = string | VtpRequest | null;
export declare type VtpResponsePayload = {
    data: Record<string, any>;
    config: StringOrVtpRequest;
    markAsLoaded(): void | any;
};
export declare type OnVtpResponseFn = (payload: VtpResponsePayload) => void | any;
export declare type OnVtpResponseLeanFn = (data: Record<string, any>, others: {
    config: StringOrVtpRequest;
    markAsLoaded(): void | any;
}) => void | any;
export declare function newRequest(url: StringOrVtpRequest | ((self: any) => StringOrVtpRequest), errorHandler?: (error: VtpHttpErrorResponse) => void | any): any;
export { VtpHttpRequest };
