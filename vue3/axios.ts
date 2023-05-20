import {Ref, ref} from "vue";
import {AxiosInstance} from "axios";

export function makeAxiosFnUsing<Client extends AxiosInstance>($client: Client) {
    type promiseFn = ($clientSide: Client) => Promise<any> | string | false;

    /**
     * use Http function
     * returns
     * [data, loadingFn, isLoading]
     * @param fn
     * @param options
     */
    function useAxios<T = any>(
        fn: promiseFn | string,
        options: {
            def?: T;
            key?: string;
            loading?: boolean;
            onLoad?: (data: T) => any;
            onError?: (error: any) => any;
        } = {}
    ): [Ref<T>, () => Promise<void>, Ref<boolean>] {
        options = Object.assign({loading: true}, options);

        const data = ref<T>(options.def! as T);
        const loading = ref(options.loading !== false);

        const load = async function () {
            // Start loading
            loading.value = true;

            // Call the function
            try {
                // if fn is string then we take it as a get request
                if (typeof fn === "string") {
                    const url = fn as string;
                    fn = (client) => client.get(url);
                }

                // call function
                let fnData = fn($client) as (Promise<any> | string | false);

                // stop request if it is false
                if (fnData === false) {
                    loading.value = false;
                    return;
                }

                // If fnData is string we take it as a get request also
                if (typeof fnData === "string") {
                    fnData = $client.get(fnData as string);
                }


                // Send Request
                const res = await fnData;

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

        return [data as Ref<T>, load, loading];
    }

    return useAxios;
}