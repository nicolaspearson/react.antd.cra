import { action } from 'mobx';
import * as React from 'react';
import { Route, State } from 'router5';

import App from '@containers/App';
import { RouteNames } from '@enums/RouteNames';
import { RouterStore } from '@store/RouterStore';

export interface LinkData {
	name: string;
	params?: object;
}

export type DoneFn = (err?: any, state?: State) => void;
export type Params = Record<string, any>;

export interface AdvRoute extends Route {
	link: (...args: any[]) => LinkData;
	component: (next?: Params) => any;
	activate?: (store: RouterStore, current?: Params, prev?: State) => void;
	deactivate?: (store: RouterStore, current?: Params, next?: State) => void;
}

export interface Routes {
	[name: string]: AdvRoute;
}

export const routes: Routes = {};

export const HomeRoute: AdvRoute = {
	name: RouteNames.HOME,
	path: '/',

	link: () => ({
		name: HomeRoute.name
	}),

	component: () => <App />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(HomeRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(HomeRoute.name);
	}
};
routes[HomeRoute.name] = HomeRoute;

export const CalendarRoute: AdvRoute = {
	name: RouteNames.CALENDAR,
	path: '/calendar',

	link: () => ({
		name: CalendarRoute.name
	}),

	component: () => <App />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(CalendarRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(CalendarRoute.name);
	}
};
routes[CalendarRoute.name] = CalendarRoute;

export const SearchRoute: AdvRoute = {
	name: RouteNames.SEARCH,
	path: '/search',

	link: () => ({
		name: SearchRoute.name
	}),

	component: () => <App />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(SearchRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(SearchRoute.name);
	}
};
routes[SearchRoute.name] = SearchRoute;
