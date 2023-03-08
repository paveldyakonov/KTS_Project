export type CategoryItemApi = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type CategoryItemModel = {
  id: string;
  name: string;
  image: string;
};

export const normalizeCategoryItem = (
  from: CategoryItemApi
): CategoryItemModel => ({
  id: from.id,
  name: from.name,
  image: from.image,
});
