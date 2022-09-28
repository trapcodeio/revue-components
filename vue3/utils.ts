import {ref} from "vue";

export const isProd = (() => {
    try {
        // @ts-ignore
        if (import.meta && import.meta.env) {
            // @ts-ignore
            return import.meta.env.PROD === true;
        } else {
            // @ts-ignore
            if (process && process.env) {
                // @ts-ignore
                return process.env.NODE_ENV === "production";
            } else return false;
        }
    } catch {
        return false;
    }
})();

export const isDev = !isProd;

let showDevValues = ref(true);

export function ifDev<T = any>(yes: T, no?: T) {
    return isDev && showDevValues.value ? yes : no;
}

export function turnOffDevValues(val: boolean = true) {
    showDevValues.value = !val;
}

export function ifDevRun<T = any>(fn: () => T) {
    if (isDev) return fn();
}

export function ifProdRun<T = any>(fn: () => T) {
    if (!isDev) return fn();
}

