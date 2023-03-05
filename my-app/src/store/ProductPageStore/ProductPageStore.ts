import { API_ENDPOINT } from "@config/api";
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

type PrivateFields = "_card";

export default class ProductPageStore implements ILocalStore {
  private _card: ProductItemModel = {
    image1: "",
    image2: "",
    image3: "",
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    categoryId: "",
  };

  constructor() {
    makeObservable<ProductPageStore, PrivateFields>(this, {
      _card: observable,
      card: computed,
      getProductInfo: action.bound,
    });
  }

  get card(): ProductItemModel {
    return this._card;
  }

  async getProductInfo(id?: string): Promise<void> {
    const result = await axios<ProductItemApi>({
      method: "get",
      url: `${API_ENDPOINT.PRODUCTS}/${id}`,
    });

    runInAction(() => {
      this._card = normalizeProductItem(result.data);
    });
  }

  destroy(): void {}
}
