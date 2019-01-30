import { configure } from 'mobx';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ErrorBoundary from '@components/boundary/ErrorBoundary';
import { RouteNames } from '@enums/RouteNames';
import { RootStore } from '@store/RootStore';

// Apply styles and theme
import '@theme/styles/default/index.less';

// MobX: Enforce strict mode
configure({ enforceActions: 'observed' });

@observer
export class Main extends React.Component {
	private store = new RootStore();

	constructor(props: any, context?: any) {
		super(props, context);
		const { router } = this.store.routerStore;
		router.start();
		router.navigate(RouteNames.HOME);
	}

	public renderRoute() {
		const { route, routes } = this.store.routerStore;
		if (route) {
			return routes[route.name].component(route.params);
		}
	}

	public render() {
		return (
			<Provider store={this.store} routerStore={this.store.routerStore}>
				<ErrorBoundary>{this.renderRoute()}</ErrorBoundary>
			</Provider>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
