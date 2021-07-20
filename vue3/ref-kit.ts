import {Ref} from "vue";

/**
 * Sets ref value
 *
 * @example
 * setRef(ref, "value")
 * // is same as
 * ref.value = "value";
 *
 * @param ref
 * @param value
 */
export function setRef<T = any>(ref: Ref<T>, value: T) {
    ref.value = value;
    return ref.value;
}


/**
 * Sets ref value to the result of the function passed.
 *
 * @example
 * setRefFrom(ref, (v) => v ? "yes": "no")
 * // is same as
 * ref.value = ref.value ? "yes": "no";
 * @param ref
 * @param from
 */
export function setRefFrom<T = any>(ref: Ref<T>, from: (value: T) => T) {
    return setRef(ref, from(ref.value));
}

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
    return ($set?: boolean | void) => toggleRef(ref, typeof $set === "boolean" ? $set : set);
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
