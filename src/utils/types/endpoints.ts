export const baseApi = "http://127.0.0.1/api/v1";

export type Endpoint = {
    [key: string]: string;
};

export const endpoints: Endpoint = {
    auth: baseApi + "/auth/admin",
    category: baseApi + "/category",
    products: "/products",
};