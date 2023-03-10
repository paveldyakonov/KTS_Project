import { ProductItemModel } from "@store/models/ProductsList";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore/instance";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_cardsList";

export default class CartStore implements ILocalStore {
  private _cardsList: CollectionModel<string, ProductItemModel> =
    getInitialCollectionModel();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cardsList: observable,
      cardsList: computed,
      cardsListCollection: computed,
      getCardsListFromLocalStorage: action.bound,
      setCartListInLocalStorage: action.bound,
      deleteCardFromCartInLocalStorage: action.bound,
    });
  }

  get cardsList(): ProductItemModel[] {
    return linearizeCollection(this._cardsList);
  }

  get cardsListCollection(): CollectionModel<string, ProductItemModel> {
    return this._cardsList;
  }

  getCardsListFromLocalStorage(): void {
    let cartListFromLocalStorage = JSON.parse(JSON.stringify(this._cardsList));
    const cartListString: string | null =
      rootStore.queryLocalStorage.getDataFromLocalStorage("cart");
    let cartListParsed: ProductItemModel[] = [];
    if (cartListString) {
      cartListParsed = JSON.parse(cartListString);
      for (const item of cartListParsed) {
        if (item && !cartListFromLocalStorage.order.includes(item.id)) {
          cartListFromLocalStorage.order.push(item.id);
          cartListFromLocalStorage.entities[item.id] = item;
        }
      }
    }
    this._cardsList = cartListFromLocalStorage;
  }

  setCartListInLocalStorage(card: ProductItemModel): void {
    this.getCardsListFromLocalStorage();
    let list = JSON.parse(JSON.stringify(this._cardsList));
    if (!list.order.includes(card.id)) {
      list.order.push(card.id);
      list.entities[card.id] = card;
    }
    this._cardsList = list;
    rootStore.queryLocalStorage.setDataInLocalStorage(
      JSON.stringify(linearizeCollection(list)),
      "cart"
    );
  }

  deleteCardFromCartInLocalStorage(cardId: string): void {
    this.getCardsListFromLocalStorage();
    let list: CollectionModel<string, ProductItemModel> = JSON.parse(
      JSON.stringify(this._cardsList)
    );

    let newList: CollectionModel<string, ProductItemModel> =
      getInitialCollectionModel();

    for (const id of list.order) {
      if (id !== cardId) {
        newList.order.push(id);
        newList.entities[id] = list.entities[id];
      }
    }
    this._cardsList = newList;
    rootStore.queryLocalStorage.setDataInLocalStorage(
      JSON.stringify(linearizeCollection(newList)),
      "cart"
    );
  }

  destroy(): void {}
}
