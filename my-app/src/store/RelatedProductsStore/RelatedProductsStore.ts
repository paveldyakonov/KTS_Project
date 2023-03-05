import { API_ENDPOINT } from "@config/api";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
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

type PrivateFields = "_cardsList";

export default class RelatedProductsStore implements ILocalStore {
  private _cardsList: CollectionModel<number, ProductItemModel> =
    getInitialCollectionModel();

  private _offset: number = 0;
  private _categoryId: number | string = 0;

  constructor(categoryId: number | string) {
    this._categoryId = categoryId;
    makeObservable<RelatedProductsStore, PrivateFields>(this, {
      _cardsList: observable.ref,
      cardsList: computed,
      getProductsList: action.bound,
      destroy: action.bound,
    });
  }

  get cardsList(): ProductItemModel[] {
    return linearizeCollection(this._cardsList);
  }

  async getProductsList(
    mode: string = "",
    categoryId: number | string
  ): Promise<void> {
    this._cardsList = getInitialCollectionModel();

    const result = await axios<ProductItemApi[]>({
      method: "get",
      url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}/${categoryId}/products`,
      params: {
        offset: this._offset,
        limit: 6,
      },
    });

    runInAction(() => {
      try {
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
      }
    });
  }

  destroy(): void {
    this._cardsList = getInitialCollectionModel();
    this._offset = 0;
  }
}
