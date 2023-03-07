import rootStore from "@store/RootStore";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from "mobx";

type PrivateFields = "_text" | "_categoryId";

export default class InputStore implements ILocalStore {
  private _text: string = rootStore.query.getParam("search")
    ? (rootStore.query.getParam("search") as string)
    : "";

  private _categoryId: string = rootStore.query.getParam("categoryId")
    ? (rootStore.query.getParam("categoryId") as string)
    : "Filter";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _text: observable,
      _categoryId: observable,
      categoryId: computed,
      setCategoryId: action.bound,
      text: computed,
      setText: action.bound,
    });
  }

  get text(): string {
    return this._text;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  setText(text: string) {
    this._text = text;
  }

  setCategoryId(text: string) {
    this._categoryId = text;
  }

  destroy(): void {
    //this._qqReaction();
    //this._qqReactionCategoryId();
  }

  private readonly _qqReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      if (search) {
        this.setText(search as string);
      } else {
        this.setText("");
      }
    }
  );

  private readonly _qqReactionCategoryId: IReactionDisposer = reaction(
    () => rootStore.query.getParam("categoryId"),
    (search) => {
      search = search as string;
      if (search && search[0] !== " ") {
        this.setCategoryId(search);
      } else {
        this.setCategoryId("Filter");
      }
    }
  );
}
