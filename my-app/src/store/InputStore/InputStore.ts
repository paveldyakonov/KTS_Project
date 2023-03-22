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

type PrivateFields = "_text";

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
      text: computed,
      setText: action.bound,
    });
  }

  get text(): string {
    return this._text ?? "";
  }

  setText(text: string) {
    this._text = text;
  }

  destroy(): void {
    this._qqReaction();
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
}
