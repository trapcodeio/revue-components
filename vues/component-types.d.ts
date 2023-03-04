export type ILoadingButton<Data = any> = {
    data: Data
    startLoading(): void | any;
    stopLoading(run?: () => any | void): void | any
}