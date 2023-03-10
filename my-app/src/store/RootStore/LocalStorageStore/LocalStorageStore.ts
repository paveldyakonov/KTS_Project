export default class LocalStorageStore {
  getDataFromLocalStorage(whatData: string): string | null {
    const data = localStorage.getItem(whatData);
    return data;
  }

  setDataInLocalStorage(newData: any, whatData: string): void {
    localStorage.setItem(whatData, newData);
  }
}
