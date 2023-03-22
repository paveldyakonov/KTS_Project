import { action, computed, observable } from 'mobx';
import { makeObservable } from 'mobx';

type PrivateFields = "_changeLocalStorage";

export default class LocalStorageStore {
  private _changeLocalStorage: number = 0;

  constructor() {
    makeObservable<LocalStorageStore, PrivateFields>(this, {
      _changeLocalStorage: observable,
      changeLocalStorage: computed,
      setDataInLocalStorage: action.bound,
    });
  }

  get changeLocalStorage(): number {
    return this._changeLocalStorage;
  }
  
  getDataFromLocalStorage(whatData: string): string | null {
    const data = localStorage.getItem(whatData);
    return data;
  }

  setDataInLocalStorage(newData: string, whatData: string): void {
    localStorage.setItem(whatData, newData);
    this._changeLocalStorage = newData.length;
  }
}
