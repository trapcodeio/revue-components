## Revue - Http
This file contains the documentation for the `axios.ts` file.

## makeAxiosFnUsing
This function creates a function that can be used to make a HTTP request.

```js
import { makeAxiosFnUsing } from 'revue-components/dist/vue3/axios';

export const useAxios = makeAxiosFnUsing(yourAxiosInstance);
// useAxios is now a function that can be used to make HTTP requests using `yourAxiosInstance`
```

Assuming we have a route @ `/ping` that returns `{hi: "hello", foo: "bar"}`:

```js
const [data, load, isLoading] = useAxios('/ping');
load(); // Make the request

// data - {hi: "hello", foo: "bar"}
// load - The function that sends the request
// isLoading - true if the request is in progress
```

The `useAxios` function can also accept a function

```js
const [data, load, isLoading] = useAxios((axiosInstance) => axiosInstance.post('/ping'));
load(); // Make the POST request
```

