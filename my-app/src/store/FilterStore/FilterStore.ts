import { API_ENDPOINT } from "@config/api";
import {
  CategoryItemModel,
  CategoryItemApi,
  normalizeCategoryItem,
} from "@store/models/CategoryList";
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

type PrivateFields = "_categoryList" | "_isOpen" | "_meta" | "_categoryId";

export default class FilterStore implements ILocalStore {
  private _categoryList: CollectionModel<string, CategoryItemModel> =
    getInitialCollectionModel();

  private _isOpen: boolean = false;
  private _meta: Meta = Meta.initial;
  private _categoryId: string | undefined = rootStore.query.getParam(
    "categoryId"
  )
    ? rootStore.query.getParam("categoryId")?.toString()
    : "FFilter";

  constructor() {
    makeObservable<FilterStore, PrivateFields>(this, {
      _categoryList: observable.ref,
      _isOpen: observable,
      _meta: observable,
      _categoryId: observable,
      categoryList: computed,
      categoryId: computed,
      isOpen: computed,
      meta: computed,
      setIsOpen: action.bound,
      setCategoryId: action.bound,
      getCategoryList: action.bound,
    });
  }

  get categoryList(): CategoryItemModel[] {
    return linearizeCollection(this._categoryList);
  }

  get categoryId(): string {
    return this._categoryId ?? "";
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  get meta(): Meta {
    return this._meta;
  }

  setIsOpen(): void {
    this._isOpen = !this._isOpen;
  }

  setCategoryId(text: string) {
    this._categoryId = text;
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
        list.order.push(" Deselect");
        list.entities[" Deselect"] = {
          id: " ",
          image: "",
          name: "Deselect",
        };

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

  destroy(): void {
    this._qqReactionCategoryId();
  }

  private readonly _qqReactionCategoryId: IReactionDisposer = reaction(
    () => rootStore.query.getParam("categoryId"),
    (search) => {
      search = search?.toString();
      if (search && search !== "") {
        this.setCategoryId(search);
      } else {
        this.setCategoryId("FFilter");
      }
    }
  );
}
