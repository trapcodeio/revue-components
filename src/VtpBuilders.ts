import VtpHttpRequest, {VtpHttpErrorResponse} from "./VtpHttpRequest";
import {AxiosRequestConfig} from "axios";

export type VtpRequest = {
    name?: string
    url: string
    query?: Record<string, any>
    config?: AxiosRequestConfig
}

export type StringOrVtpRequest = string | VtpRequest | null
export type VtpResponsePayload = {
    data: Record<string, any>
    config: StringOrVtpRequest
    markAsLoaded(): void | any
};

export type OnVtpResponseFn = (payload: VtpResponsePayload) => void | any;

export type OnVtpResponseLeanFn = (data: Record<string, any>, others: {
    config: StringOrVtpRequest,
    markAsLoaded(): void | any
}) => void | any;

interface VtpMethods {
    $api: VtpHttpRequest
    $vtpRequestHandler: VtpHttpRequest

    fetchData(): void

    reFetchData(resetData?: boolean): void

    onVtpResponse?: OnVtpResponseFn
    onVtpResponseLean?: OnVtpResponseLeanFn
    onVtpResponseError?: any
    vtp: {
        loaded: boolean,
        completed: boolean
    },
}

interface VtpRequestMixin extends VtpMethods {
    data: any,
    mounted: () => void;
    methods: VtpMethods;
}

export function newRequest(url: StringOrVtpRequest | ((self: any) => StringOrVtpRequest), errorHandler?: (error: VtpHttpErrorResponse) => void | any): any {
    return <VtpRequestMixin>{
        data() {
            return {
                vtp: {
                    loaded: false,
                    completed: false
                }
            }
        },
        mounted() {
            if (this.fetchData) this.fetchData();
        },
        methods: {
            fetchData() {
                let path = url;
                let config: AxiosRequestConfig & { query?: Record<string, any> } | undefined = {};

                if (typeof path === "function") {
                    path = path(this);
                }

                if (!path) return;


                if (typeof path === "object") {
                    config = (path as VtpRequest).config;
                    path = (path as VtpRequest).url;
                }

                const requestHandler = this.$vtpRequestHandler ? this.$vtpRequestHandler : new VtpHttpRequest();

                requestHandler!.get(path as string, config ? config.query : {}, config as any).then((res: any) => {
                    if (this.onVtpResponse) {
                        this.onVtpResponse({
                            data: res,
                            config: config as StringOrVtpRequest,
                            markAsLoaded: () => {
                                this.vtp!.loaded = true;
                            }
                        });
                    } else if (this.onVtpResponseLean) {
                        this.onVtpResponseLean(res, {
                            config: config as StringOrVtpRequest,
                            markAsLoaded: () => {
                                this.vtp!.loaded = true;
                            }
                        });
                    }

                    this.vtp.completed = true;
                }).catch((error: any) => {
                    if (this.onVtpResponseError) {
                        this.onVtpResponseError(error);
                    } else if (errorHandler) {
                        errorHandler(error);
                    } else {
                        console.error(error);
                    }
                });
            },

            reFetchData(resetData: true) {
                if (resetData) {
                    this.vtp.loaded = false;
                    this.vtp.completed = false;
                }

                this.fetchData()
            },
        }
    }
}

export {VtpHttpRequest}