import {ref} from "vue";


export function makeHttpFnUsing<Client>($client: Client) {
    type promiseFn = ($clientSide: Client) => Promise<any>;

    /**
     * use Http function
     * returns
     * [data, loadingFn, isLoading]
     * @param fn
     * @param options
     */
    function useHttp<T = any>(
        fn: promiseFn,
        options: {
            def?: T;
            key?: string;
            loading?: boolean;
            onLoad?: () => any;
        } = {}
    ) {
        options = Object.assign({loading: true}, options);

        const data = ref<T>(options.def! as T);
        const loading = ref(options.loading !== false);

        const load = async function () {
            // Start loading
            loading.value = true;

            // Call the function
            const res = await fn($client);

            // Get the data by key if exists
            if (options.key) {
                data.value = res[options.key];
            } else {
                data.value = res;
            }

            if (options.onLoad) await options.onLoad();

            loading.value = false;
        };

        return [data, load, loading] as [typeof data, typeof load, typeof loading];
    }

    return useHttp;
}
