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
  private _text: string | undefined = rootStore.query.getParam("search")
    ? rootStore.query.getParam("search")?.toString()
    : "";

  private _categoryId: string | undefined = rootStore.query.getParam(
    "categoryId"
  )
    ? rootStore.query.getParam("categoryId")?.toString()
    : "FFilter";

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
    if (this._text) return this._text;
    return "";
  }

  get categoryId(): string {
    if (this._categoryId) return this._categoryId;
    return "";
  }

  setText(text: string) {
    this._text = text;
  }

  setCategoryId(text: string) {
    this._categoryId = text;
  }

  destroy(): void {
    // this._qqReaction();
    // this._qqReactionCategoryId();
  }

  private readonly _qqReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      search = search?.toString();
      if (search) {
        this.setText(search);
      } else {
        this.setText("");
      }
    }
  );

  private readonly _qqReactionCategoryId: IReactionDisposer = reaction(
    () => rootStore.query.getParam("categoryId"),
    (search) => {
      search = search?.toString();
      if (search && search[0] !== " ") {
        this.setCategoryId(search);
      } else {
        this.setCategoryId("FFilter");
      }
    }
  );
}
