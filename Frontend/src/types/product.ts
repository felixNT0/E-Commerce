export type ProductItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description?: string;
  createdAt?: string;
};

export type ProductPayload = {
  name: string;
  category: string;
  price: number | string;
  imageUrl: string;
  description?: string;
};
