export type categoryProduct = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type ProductItemModel = {
  images: string[];
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  categoryId: string;
};

export type ProductItemApi = {
  id: string;
  title: string;
  price: string;
  description: string;
  images: any;
  creationAt: string;
  updatedAt: string;
  category: categoryProduct;
};

export const normalizeProductItem = (
  from: ProductItemApi
): ProductItemModel => ({
  images: from.images,
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: from.category.name,
  categoryId: from.category.id,
});
