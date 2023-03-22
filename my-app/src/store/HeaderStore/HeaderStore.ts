import { ProductItemModel } from "@store/models/ProductsList";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction } from "mobx";

type PrivateFields = "_cartLength";

export default class HeaderStore implements ILocalStore {
  private _cartLength: number = 0;

  constructor() {
    this._cartLength = this.getCartFromLocalStorage();
    makeObservable<HeaderStore, PrivateFields>(this, {
      _cartLength: observable,
      cartLength: computed,
      getCartFromLocalStorage: action.bound,
    });
  }

  get cartLength(): number {
    return this._cartLength;
  }

  getCartFromLocalStorage(): number {
    const cartListString: string | null =
      rootStore.queryLocalStorage.getDataFromLocalStorage("cart");
    let cartListParsed: ProductItemModel[] = [];
    if (cartListString) {
        cartListParsed = JSON.parse(cartListString);
        this._cartLength = cartListParsed.length;
    }
    return cartListParsed.length;
  }

  destroy(): void {
    this._lsReaction();
  }

  private readonly _lsReaction: IReactionDisposer = reaction(
    () => rootStore.queryLocalStorage.changeLocalStorage,
    (data) => {
        this.getCartFromLocalStorage();
    }
  );
}