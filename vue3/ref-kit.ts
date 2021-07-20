import {Ref} from "vue";

/**
 * Toggles a ref.
 * @param ref
 * @param set
 */
export function toggleRef(ref: Ref<boolean>, set?: boolean) {
    if (typeof set === "boolean") {
        ref.value = set;
    } else {
        ref.value = !ref.value;
    }

    return ref.value;
}

/**
 * Returns a function that toggles a ref
 * @param ref
 * @param set
 */
export function toggleRefFn(ref: Ref<boolean>, set?: boolean) {
    return ($set?: boolean) => toggleRef(ref, set === undefined ? $set : set);
}

/**
 * Toggles a boolean in a reactive object.
 * @param ref
 * @param key
 * @param set
 */
export function toggleInReactive<T = Record<any, any>>(
    ref: T,
    key: keyof T,
    set?: boolean
) {
    if (typeof set === "boolean") {
        (ref as any)[key] = set;
    } else {
        (ref as any)[key] = !ref[key];
    }

    return ref[key];
}
