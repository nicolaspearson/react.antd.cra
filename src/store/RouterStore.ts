import { action, observable } from 'mobx';
import { NavigationOptions } from 'router5';

import { makeMobxRouter } from '@router/router';
import { DoneFn, LinkData, routes as appRoutes } from '@router/routes';
import { RootStore } from '@store/RootStore';

// eslint-disable-next-line import/prefer-default-export
export class RouterStore {
  public rootStore: RootStore;

  public routes = appRoutes;

  public router = makeMobxRouter(this.routes, this);

  @observable
  public route: any;

  @observable
  public activeRouteName = '/';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public activatedRouteName(routeName: string) {
    this.activeRouteName = routeName;
  }

  @action
  // eslint-disable-next-line class-methods-use-this
  public deActivatedRouteName(routeName: string) {
    // eslint-disable-next-line no-console
    console.log(routeName);
  }

  public navigate = (linkData: LinkData, options?: NavigationOptions, done?: DoneFn) => {
    const { name, params } = linkData;
    this.router.navigate(name, params || {}, options || {}, done);
  };
}
