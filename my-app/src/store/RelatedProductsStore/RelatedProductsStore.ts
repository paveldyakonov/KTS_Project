import { API_ENDPOINT } from "@config/api";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
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
} from "./../models/ProductsList/productItem";

type PrivateFields = "_cardsList" | "_meta";

export default class RelatedProductsStore implements ILocalStore {
  private _cardsList: CollectionModel<string, ProductItemModel> =
    getInitialCollectionModel();

  private _offset: number = 0;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RelatedProductsStore, PrivateFields>(this, {
      _cardsList: observable.ref,
      _meta: observable,
      cardsList: computed,
      meta: computed,
      getProductsList: action.bound,
    });
  }

  get cardsList(): ProductItemModel[] {
    return linearizeCollection(this._cardsList);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(categoryId: number | string): Promise<void> {
    this._cardsList = getInitialCollectionModel();
    this._meta = Meta.loading;

    const result = await axios<ProductItemApi[]>({
      method: "get",
      url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}/${categoryId}/products`,
      params: {
        offset: this._offset,
        limit: 3,
      },
    });

    runInAction(() => {
      try {
        this._meta = Meta.success;
        const list = JSON.parse(JSON.stringify(this._cardsList));

        for (const item of result.data) {
          if (item && !this._cardsList.order.includes(item.id)) {
            list.order.push(item.id);
          }
          if (item) list.entities[item.id] = normalizeProductItem(item);
        }

        this._cardsList = list;
      } catch (error) {
        this._cardsList = getInitialCollectionModel();
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}
