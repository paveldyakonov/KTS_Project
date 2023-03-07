export type categoryProduct = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type ProductItemApi = {
  id: number;
  title: string;
  price: string | number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: categoryProduct;
};

export type ProductItemModel = {
  id: number;
  title: string;
  price: string | number;
  description: string;
  image: string;
  category: string;
};

export const normalizeProductItem = (
  from: ProductItemApi
): ProductItemModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description.slice(0, 95),
  image: from.images[0],
  category: from.category.name,
});
