export const getFetcher = (...args) => fetch(...args).then((res) => res.json());
