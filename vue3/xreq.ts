import {ref, type Ref} from "vue";

export type XReqFnResult = Promise<any> | string | false;
export type XReqFn<Client> = string | ((client: Client) => XReqFnResult);
export type MakeXReqOptions = {
    handleString: (url: string) => XReqFnResult,
}
export type UseXReqOptions<T> = {
    def?: T;
    key?: string;
    loading?: boolean;
    onLoad?: (data: T) => any;
    onError?: (error: any) => any;
}

export type XReqResult<T> = [Ref<T>, () => Promise<void>, Ref<boolean>]

export type XReq<Client> = <T = any>(
    fn: XReqFn<Client>,
    options?: UseXReqOptions<T>
) => XReqResult<T>


/**
 * Creates an XReq instance for handling HTTP requests within a specific context. This function is particularly suited for managing stateful and reactive interactions involving HTTP requests and responses.
 *
 * @param sender The client object used to send requests.
 * @param opts Configuration options for handling requests, such as custom handlers or default behaviors.
 * @return A function `useReq` that can be used to make HTTP requests and manage their state. The returned function provides reactive data, a loading state, and a function to execute the request.
 *
 * @example
 * // Create an instance
 * const api = MakeXReq(yourHttpClient, {
 *      // handleString is where you define how to handle a string as a request.
 *     handleString: (url: string) => yourHttpClient.get(url)
 * })
 *
 * // Use it
 * const [response, load, loading] = api<{ foo: string }>("/path/to/api")
 * // response - is a reactive object that contains the response data
 * // load - is a function that executes the request
 * // loading - is a reactive boolean that indicates whether the request is loading
 */
export function MakeXReq<Client>(sender: Client, opts: MakeXReqOptions): XReq<Client> {

    /**
     * use Http function
     * returns
     * [data, loadingFn, isLoading]
     * @param fn
     * @param options
     */
    function useReq<T = any>(
        fn: XReqFn<Client>,
        options: UseXReqOptions<T> = {}
    ) {
        options = Object.assign({loading: true}, options);

        const data = ref<T>(options.def! as T);
        const loading = ref(options.loading !== false);

        const load = async function () {
            // Start loading
            loading.value = true;

            // if fn is string then we take it as a get request
            if (typeof fn === "string") {
                const url = fn;
                const handleString = opts.handleString;
                fn = () => handleString(url)
            }

            // Call the function
            try {
                // call function
                let fnResult = fn(sender);

                // stop request if it is false
                if (fnResult === false) {
                    loading.value = false;
                    return;
                }

                if (typeof fnResult === 'string') {
                    const handleString = opts.handleString
                    fnResult = handleString(fnResult as string)
                }

                // Send Request
                const res = await fnResult;

                // Get the data by key if exists
                if (options.key) {
                    data.value = res[options.key];
                } else {
                    data.value = res;
                }

                // run onLoad if exists
                if (options.onLoad) await options.onLoad(data.value as T);
            } catch (e: any) {
                if (options.onError) {
                    await options.onError(e);
                }
            }

            loading.value = false;
        };

        return [data, load, loading]
    }

    return useReq as XReq<Client>;
}

// const client = {
//     get: (url: string) => {
//         return fetch(url).then(res => res.json())
//     },
//     post: (url: string, data: any) => {
//         return fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//     }
// }
// const api = MakeXReq(client, {
//     handleString: (url: string) => client.get(url)
// })
//
// const [data] = api<{ fodo: string }>('/api/users', {})
//
// const b = data.value.fodo;