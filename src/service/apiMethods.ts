import { api } from "./axios";
import { Token } from "../core/interfaces/token.interface";

interface Product {
  name: string;
  description: string;
  price: number;
  status: number;
  stock_quantity: number;
}

const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<T> => {
  try {
    const response = await api({method , url, data});
    return response.data;
  } catch (error) {
    console.error(`Erro na requisição ${method.toUpperCase()} ${url}:`, error);
   throw error;
  }
};

export const createProd = (data: any) => apiRequest('post', '/product/create', data);
export const updateProd = (id: number, data: any) => apiRequest('put', `/product/update`, {id, ...data});
export const deleteProd = (id: number, data: any) => apiRequest('delete', `/product/delete`, {id, ...data})
export const getListProd = () => apiRequest('post', '/product/list').then((res: any) => res.data);
export const getProdId = async (id: number): Promise<Product> => {
  const response = await apiRequest('get', `/product/read?id=${id}`);
  return response as Product;
};
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<Token>('/auth/login', {email, password});

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('access_token', response.data.access_token);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
