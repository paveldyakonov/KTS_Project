import { API_ENDPOINT } from "@config/api";
import {
  normalizeProductItem,
  ProductItemApi,
  ProductItemModel,
} from "@store/models/ProductsList";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields = "_cardsList" | "_cardTitle" | "_categoryId" | "_meta";

export default class ProductsListStore implements ILocalStore {
  private _cardsList: CollectionModel<number, ProductItemModel> =
    getInitialCollectionModel();

  private _cardTitle: string = rootStore.query.getParam("search")
    ? (rootStore.query.getParam("search") as string)
    : "";

  private _categoryId: string = rootStore.query.getParam("categoryId")
    ? (rootStore.query.getParam("categoryId") as string)
    : "";

  private _offset: number = 0;
  private _meta: Meta = Meta.initial;
  hasMore: boolean = true;

  constructor() {
    makeObservable<ProductsListStore, PrivateFields>(this, {
      _cardsList: observable,
      _cardTitle: observable,
      _categoryId: observable,
      _meta: observable,
      hasMore: observable,
      cardsList: computed,
      meta: computed,
      setHasMore: action.bound,
      getProductsList: action.bound,
      getProductsListMore: action.bound,
    });
  }

  setOffset(value: number) {
    this._offset += value;
    this.getProductsList();
  }

  get cardsList(): ProductItemModel[] {
    return linearizeCollection(this._cardsList);
  }

  get meta(): Meta {
    return this._meta;
  }

  setHasMore(): void {
    this.hasMore = false;
  }

  async getProductsList(mode: string = ""): Promise<void> {
    if (mode === "reset") {
      this._offset = 0;
      this._cardsList = getInitialCollectionModel();
      this.hasMore = true;
    } else {
      this._offset += 12;
    }

    this._meta = Meta.loading;

    const result = await axios<ProductItemApi[]>({
      method: "get",
      url: API_ENDPOINT.PRODUCTS,
      params: {
        title: this._cardTitle,
        categoryId: this._categoryId,
        offset: this._offset,
        limit: 12,
      },
    });

    runInAction(() => {
      this._meta = Meta.success;
      if (result.data.length === 0) {
        this.setHasMore();
        return;
      }

      try {
        const list = JSON.parse(JSON.stringify(this._cardsList));

        for (const item of result.data) {
          if (item && !list.order.includes(item.id)) {
            list.order.push(item.id);
            list.entities[item.id] = normalizeProductItem(item);
          }
        }

        this._cardsList = list;
      } catch (error) {
        this._cardsList = getInitialCollectionModel();
        this._meta = Meta.error;
      }
    });
  }

  getProductsListMore(): void {
    this.getProductsList();
  }

  destroy(): void {
    //this._qqReaction();
    //this._qqReactionCategoryId();
  }

  private readonly _qqReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      this._cardTitle = search as string;
      this.getProductsList("reset");
    }
  );

  private readonly _qqReactionCategoryId: IReactionDisposer = reaction(
    () => rootStore.query.getParam("categoryId"),
    (search) => {
      this._categoryId = search as string;
      this.getProductsList("reset");
    }
  );
}
