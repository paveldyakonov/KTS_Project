export type ProductItemModel = {
  image1: string;
  image2: string;
  image3: string;
  id: any;
  title: string;
  price: string;
  description: string;
  category: string;
  categoryId: any;
};

export type ProductItemApi = {
  id: number;
  title: string;
  price: string;
  description: string;
  images: any;
  creationAt: string;
  updatedAt: string;
  category: any;
};

export const normalizeProductItem = (
  from: ProductItemApi
): ProductItemModel => ({
  image1: from.images[0],
  image2: from.images[1],
  image3: from.images[2],
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: from.category.name,
  categoryId: from.category.id,
});
