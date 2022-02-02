import {ref} from "vue";
import {AxiosInstance} from "axios";


export function makeAxiosFnUsing<Client extends AxiosInstance>($client: Client) {
    type promiseFn = ($clientSide: Client) => Promise<any>;

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
    ) {
        options = Object.assign({loading: true}, options);

        const data = ref<T>(options.def! as T);
        const loading = ref(options.loading !== false);

        const load = async function () {
            // Start loading
            loading.value = true;

            // Call the function
            try {
                // if fn is string then we take it as a get request
                if (typeof fn === 'string') {
                    fn = (client) => client.get(fn as string);
                }

                const res = await fn($client);

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

        return [data, load, loading] as [typeof data, typeof load, typeof loading];
    }

    return useAxios;
}
