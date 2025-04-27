import VtpHttpRequest, {type VtpHttpErrorResponse} from "./VtpHttpRequest";
import type {AxiosRequestConfig} from "axios";

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

export function newRequest(url: StringOrVtpRequest | ((self: any) => StringOrVtpRequest), errorHandler?: (error: VtpHttpErrorResponse) => void | any) {
    return (<VtpRequestMixin>{
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
                let query: Record<string, any> = {};
                let config: AxiosRequestConfig & { query?: Record<string, any> } | undefined = {};

                if (typeof path === "function") {
                    path = path(this);
                }

                if (!path) return;


                if (typeof path === "object") {
                    config = path.config;

                    if (path.query)
                        query = path.query;

                    // Switch path back to string
                    path = path.url;
                }

                // @ts-ignore
                const requestHandler = this.$vtpRequestHandler ? this.$vtpRequestHandler : new VtpHttpRequest();

                requestHandler!.get(path as string, query, config as any).then((res: any) => {
                    // @ts-ignore
                    if (this.onVtpResponse) {
                        // @ts-ignore
                        this.onVtpResponse({
                            data: res,
                            config: config as StringOrVtpRequest,
                            markAsLoaded: () => {
                                this.vtp!.loaded = true;
                            }
                        });
                    } else {
                        // @ts-ignore
                        if (this.onVtpResponseLean) {
                            // @ts-ignore
                            this.onVtpResponseLean(res, {
                                config: config as StringOrVtpRequest,
                                markAsLoaded: () => {
                                    this.vtp!.loaded = true;
                                }
                            });
                        }
                    }

                    this.vtp.completed = true;
                }).catch((error: any) => {
                    // @ts-ignore
                    if (this.onVtpResponseError) {
                        // @ts-ignore
                        this.onVtpResponseError(error);
                    } else if (errorHandler) {
                        errorHandler(error);
                    } else {
                        console.error(error);
                    }
                });
            },

            reFetchData(resetData = true) {
                if (resetData) {
                    this.vtp.loaded = false;
                    this.vtp.completed = false;
                }

                this.fetchData()
            },
        }
    }) as any
}

export {VtpHttpRequest}