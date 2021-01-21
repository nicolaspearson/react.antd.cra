import { RouterStore } from '@store/RouterStore';

// eslint-disable-next-line import/prefer-default-export
export class RootStore {
  public routerStore: RouterStore;

  constructor() {
    this.routerStore = new RouterStore(this);
  }
}
