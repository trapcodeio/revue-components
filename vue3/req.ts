import {type Ref, ref} from "vue";

export function makeReqFnUsing<Sender>(sender: Sender) {
    type promiseFn = (sender: Sender) => Promise<any> | string | false;

    /**
     * use Http function
     * returns
     * [data, loadingFn, isLoading]
     * @param fn
     * @param options
     */
    function useReq<T = any>(
        fn: promiseFn,
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
                // call function
                let fnData = fn(sender) as Promise<any> | string | false;

                // stop request if it is false
                if (fnData === false) {
                    loading.value = false;
                    return;
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

        return [data, load, loading] as [typeof data, typeof load, typeof loading];
    }

    return useReq;
}