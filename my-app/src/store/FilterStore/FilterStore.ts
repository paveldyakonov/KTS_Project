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
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_categoryList" | "_isOpen";

export default class FilterStore implements ILocalStore {
  private _categoryList: CollectionModel<string, CategoryItemModel> =
    getInitialCollectionModel();

  private _isOpen: boolean = false;

  constructor() {
    makeObservable<FilterStore, PrivateFields>(this, {
      _categoryList: observable.ref,
      _isOpen: observable,
      categoryList: computed,
      isOpen: computed,
      setIsOpen: action.bound,
      getCategoryList: action.bound,
    });
  }

  get categoryList(): CategoryItemModel[] {
    return linearizeCollection(this._categoryList);
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  setIsOpen(): void {
    this._isOpen = !this._isOpen;
  }

  async getCategoryList(): Promise<void> {
    const result = await axios<CategoryItemApi[]>({
      method: "get",
      url: `${API_ENDPOINT.CATEGORY_ALL_PRODUCTS}`,
    });

    runInAction(() => {
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
      } catch (error) {}
    });
  }

  destroy(): void {}
}
