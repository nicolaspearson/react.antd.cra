import { runInAction } from 'mobx';
import createRouter, { Plugin, PluginFactory, Router, State } from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { AdvRoute, Routes } from '@router/routes';
import { RouterStore } from '@store/RouterStore';

function makeMobxRouterPlugin(routes: Routes, store: RouterStore): PluginFactory {
  function mobxRouterPlugin(): Plugin {
    return {
      onTransitionSuccess(nextState?: State, prevState?: State) {
        const prevParams = (prevState || ({} as any)).params || {};
        const nextParams = nextState && nextState.params ? nextState.params : {};
        const prevRoute: AdvRoute = routes[(prevState || ({} as any)).name];
        const nextRoute: AdvRoute = routes[(nextState || ({} as any)).name];

        if (prevRoute && prevRoute.deactivate) {
          prevRoute.deactivate(store, prevParams, nextState);
        }

        runInAction(() => {
          // eslint-disable-next-line no-param-reassign
          store.route = nextState;
          if (nextRoute && nextRoute.activate) {
            nextRoute.activate(store, nextParams, prevState || ({} as any));
          }
        });
      },
    };
  }
  return (mobxRouterPlugin as any) as PluginFactory;
}

// eslint-disable-next-line import/prefer-default-export
export function makeMobxRouter(routes: Routes, store: RouterStore): Router {
  const appRoutes = Object.keys(routes).map((key) => routes[key]);
  const router = createRouter(appRoutes);
  router.usePlugin(browserPlugin(), makeMobxRouterPlugin(routes, store));
  return router;
}
