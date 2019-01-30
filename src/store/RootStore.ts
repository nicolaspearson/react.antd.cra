import { RouterStore } from '@store/RouterStore';

export class RootStore {
	public routerStore: RouterStore;

	constructor() {
		this.routerStore = new RouterStore(this);
	}
}
