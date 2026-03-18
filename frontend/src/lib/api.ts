const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  categories: {
    getAll: () => fetchApi('/categories'),
    getOne: (id: number) => fetchApi(`/categories/${id}`),
  },
  products: {
    getAll: (params?: { categoryId?: number; search?: string }) => {
      const qs = new URLSearchParams();
      if (params?.categoryId) qs.append('categoryId', params.categoryId.toString());
      if (params?.search) qs.append('search', params.search);
      return fetchApi(`/products?${qs.toString()}`);
    },
    getOne: (id: number) => fetchApi(`/products/${id}`),
    getByCategoryName: (name: string) => fetchApi(`/products/category/${name}`),
  },
  orders: {
    create: (data: any) => fetchApi('/orders', { method: 'POST', body: JSON.stringify(data) }),
    getOne: (id: number) => fetchApi(`/orders/${id}`),
  }
};
