import { API_ENDPOINT } from "@config/api";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  normalizeProductItem,
  ProductItemApi,
  ProductItemModel,
} from "./types";

type PrivateFields = "_card" | "_meta";

export default class ProductPageStore implements ILocalStore {
  private _card: ProductItemModel = {
    images: [],
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    categoryId: "",
  };

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _card: observable,
      _meta: observable,
      card: computed,
      meta: computed,
      getProductInfo: action.bound,
    });
  }

  get card(): ProductItemModel {
    return this._card;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductInfo(id?: string): Promise<void> {
    this._meta = Meta.loading;

    const result = await axios<ProductItemApi>({
      method: "get",
      url: `${API_ENDPOINT.PRODUCTS}/${id}`,
    });

    runInAction(() => {
      try {
        this._meta = Meta.success;
        this._card = normalizeProductItem(result.data);
      } catch (error) {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}
