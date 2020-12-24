export type ILoadingButton = {
    startLoading(): void | any;
    stopLoading(run?: () => any | void): void | any
}