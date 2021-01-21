import { observer } from 'mobx-react';
import * as React from 'react';

import { RouteNames } from '@enums/RouteNames';

import RouterLink from '@components/functional/RouterLink';
import Logo from '@components/icon/Logo';

import './style.less';

export interface HeaderProps {
  children?: any;
}

@observer
class Header extends React.Component<HeaderProps> {
  public render() {
    return (
      <header>
        <section className="Header">
          <div className="Header__Background" />
          <div className="Header__Inner Top">
            <nav className="Header__Bar">
              <RouterLink routeName={RouteNames.HOME}>
                <div className="Header__Logo">
                  <Logo />
                </div>
              </RouterLink>
            </nav>
          </div>
          <div className="Header__Separator" />
          {this.props.children}
        </section>
      </header>
    );
  }
}

export default Header;
