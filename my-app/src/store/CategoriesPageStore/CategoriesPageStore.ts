import axios from "axios";

import { CategoryItemApi, CategoryItemModel, normalizeCategoryItem } from "@store/models/CategoryList";
import { CollectionModel, getInitialCollectionModel, linearizeCollection } from "@store/models/shared/collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { API_ENDPOINT } from "@config/api";

type PrivateFields = "_categoryList" | "_meta";

export default class CategoriesPageStore implements ILocalStore {
  private _categoryList: CollectionModel<string, CategoryItemModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesPageStore, PrivateFields>(this, {
      _categoryList: observable.ref,
      _meta: observable,
      categoryList: computed,
      meta: computed,
      getCategoryList: action.bound,
    });
  }

  get categoryList(): CategoryItemModel[] {
    return linearizeCollection(this._categoryList);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoryList(): Promise<void> {
    this._meta = Meta.loading;

    const result = await axios<CategoryItemApi[]>({
      method: "get",
      url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}`,
    });

    runInAction(() => {
      this._meta = Meta.success;
      try {
        let list = getInitialCollectionModel();
        for (const item of result.data) {
          list.order.push(item.id);
          list.entities[item.id] = normalizeCategoryItem(item);
        }
        this._categoryList = list;
      } catch (error) {
        console.log(error);
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}