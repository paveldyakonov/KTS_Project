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
  private _cardsList: CollectionModel<string, ProductItemModel> =
    getInitialCollectionModel();

  private _cardTitle: string | undefined = rootStore.query.getParam("search")
    ? rootStore.query.getParam("search")?.toString()
    : "";

  private _categoryId: string | undefined = rootStore.query.getParam(
    "categoryId"
  )
    ? rootStore.query.getParam("categoryId")?.toString()
    : "";

  private _offset: number = 0;
  private _meta: Meta = Meta.initial;
  hasMore: boolean = true;

  constructor() {
    makeObservable<ProductsListStore, PrivateFields>(this, {
      _cardsList: observable.ref,
      _cardTitle: observable,
      _categoryId: observable,
      _meta: observable,
      hasMore: observable,
      cardsList: computed,
      meta: computed,
      offset: computed,
      setHasMore: action.bound,
      getProductsList: action.bound,
      getProductsListInit: action.bound,
      getProductsListMore: action.bound,
      getProductsListWithOffset: action.bound,
    });
  }

  get cardsList(): ProductItemModel[] {
    return linearizeCollection(this._cardsList);
  }

  get meta(): Meta {
    return this._meta;
  }

  get offset(): number {
    return this._offset;
  }

  setHasMore(): void {
    this.hasMore = false;
  }

  async getProductsList(mode: string = ""): Promise<void> {
    if (mode === "reset") {
      this.getProductsListInit();
    }

    this._meta = Meta.loading;

    let newCategoryId: string = "";
    if (this._categoryId?.toString()) {
      for (const char of this._categoryId.toString()) {
        const ch: any = parseInt(char);
        if (ch || ch === 0) {
          newCategoryId += ch.toString();
        }
      }
    }

    const result = await axios<ProductItemApi[]>({
      method: "get",
      url: API_ENDPOINT.PRODUCTS,
      params: {
        title: this._cardTitle,
        categoryId: newCategoryId,
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
      this.hasMore = true;

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

  getProductsListWithOffset(): void {
    const curOffset: undefined | string = rootStore.query.getParam("offset")
    ? rootStore.query.getParam("offset")?.toString()
    : "0";

    let numCurOffset: number = 0;
    
    if (curOffset) {
      numCurOffset = parseInt(curOffset);
      this.getProductsListInit();
      while (this._offset < numCurOffset) {
        this.getProductsList();
        this._offset += 12;
      }
    }
  }

  getProductsListInit(): void {
    this._offset = 0;
    this._cardsList = getInitialCollectionModel();
    this.hasMore = true;
  }

  getProductsListMore(): void {
    this._offset += 12;
    this.getProductsList();
  }

  destroy(): void {
    // this._qqReaction();
    // this._qqReactionCategoryId();
  }

  private readonly _qqReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      search = search?.toString();
      this._cardTitle = search ? search : "";
      this.getProductsList("reset");
    }
  );

  private readonly _qqReactionCategoryId: IReactionDisposer = reaction(
    () => rootStore.query.getParam("categoryId"),
    (search) => {
      search = search?.toString();
      this._categoryId = search ? search : "";
      this.getProductsList("reset");
    }
  );
}
