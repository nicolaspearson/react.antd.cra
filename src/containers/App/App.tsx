/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { BarsOutlined, CalendarOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu, Popover } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import RouterLink from '@components/functional/RouterLink';
import Logo from '@components/icon/Logo';
import Head from '@components/structural/Head';
import Page from '@components/structural/Page';
import { RouteNames } from '@enums/RouteNames';
import Calendar from '@pages/Calendar';
import Home from '@pages/Home';
import Search from '@pages/Search';
import { RouterStore } from '@store/RouterStore';

import './style.less';

const { Content, Header, Sider } = Layout;

export interface AppProps {
  children?: any;
  match?: Record<string, unknown>;
  routerStore?: RouterStore;
}

interface State {
  collapsed: boolean;
  loading: boolean;
  isNavbar: boolean;
  menuPopoverVisible: boolean;
}

@inject('routerStore')
@observer
class App extends React.Component<AppProps, State> {
  public state: State = {
    collapsed: false,
    loading: true,
    isNavbar: document.body.clientWidth < 770,
    menuPopoverVisible: false,
  };

  public componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
    setTimeout(() => {
      this.setState(() => ({
        loading: false,
      }));
    }, 1000);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  private handleMenuPopOverClick = () => {
    this.setState((prevState: Readonly<State>) => ({
      menuPopoverVisible: !prevState.menuPopoverVisible,
    }));
  };

  private handleMenuItemClick = () => {
    if (this.state.menuPopoverVisible) {
      this.setState(() => ({
        menuPopoverVisible: false,
      }));
    }
  };

  private toggleMenu = () => {
    this.setState((prevState: Readonly<State>) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  private getActiveMenuKey = (activeRouteName: string): string => {
    let activeKey = '1';
    switch (activeRouteName) {
      case RouteNames.HOME:
        activeKey = '1';
        break;

      case RouteNames.CALENDAR:
        activeKey = '2';
        break;

      case RouteNames.SEARCH:
        activeKey = '3';
        break;
      // no default
    }
    return activeKey;
  };

  private updateDimensions() {
    this.setState(() => ({
      isNavbar: document.body.clientWidth < 770,
    }));
  }

  private renderMenuItems(): JSX.Element[] {
    const menuItems: JSX.Element[] = [];
    menuItems.push(
      <Menu.Item key="1">
        <div onClick={this.handleMenuItemClick}>
          <RouterLink style={{ width: '100%' }} routeName={RouteNames.HOME}>
            <HomeOutlined />
            <span>Home</span>
          </RouterLink>
        </div>
      </Menu.Item>
    );
    menuItems.push(
      <Menu.Item key="2">
        <div onClick={this.handleMenuItemClick}>
          <RouterLink style={{ width: '100%' }} routeName={RouteNames.CALENDAR}>
            <CalendarOutlined />
            <span>Calendar</span>
          </RouterLink>
        </div>
      </Menu.Item>
    );
    menuItems.push(
      <Menu.Item key="3">
        <div onClick={this.handleMenuItemClick}>
          <RouterLink style={{ width: '100%' }} routeName={RouteNames.SEARCH}>
            <SearchOutlined />
            <span>Search</span>
          </RouterLink>
        </div>
      </Menu.Item>
    );
    return menuItems;
  }

  private renderAppPage = (activeRouteName: string): JSX.Element => {
    switch (activeRouteName) {
      case RouteNames.CALENDAR:
        return <Calendar />;

      case RouteNames.SEARCH:
        return <Search />;
      // no default
    }
    return <Home />;
  };

  public render() {
    const activeRouteName =
      this.props.routerStore && this.props.routerStore.activeRouteName
        ? this.props.routerStore.activeRouteName
        : RouteNames.HOME;
    return (
      <Page useLoader spinning={this.state.loading}>
        <Head>
          <title>React App</title>
          <meta name="Description" content="Create React App" />
        </Head>
        <div className="App__Body">
          <Layout>
            <Sider
              // tslint:disable no-null-keyword
              trigger={null}
              breakpoint="lg"
              collapsible
              collapsedWidth={this.state.isNavbar ? '0px' : '80px'}
              collapsed={this.state.collapsed || this.state.isNavbar}
            >
              <div className="App__Logo">
                <Logo width="60px" height="60px" />
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.getActiveMenuKey(activeRouteName)]}
              >
                {this.renderMenuItems()}
              </Menu>
            </Sider>
            <Layout style={{ height: '100vh', overflowY: 'auto' }}>
              <Header className="App__Header">
                {this.state.isNavbar ? (
                  <Popover
                    placement="bottomLeft"
                    onVisibleChange={this.handleMenuPopOverClick}
                    visible={this.state.menuPopoverVisible}
                    overlayClassName="pop-over-menu"
                    trigger="click"
                    content={
                      <Menu
                        theme="light"
                        mode="vertical"
                        defaultSelectedKeys={[this.getActiveMenuKey(activeRouteName)]}
                      >
                        {this.renderMenuItems()}
                      </Menu>
                    }
                  >
                    <div className="Menu__Button">
                      <BarsOutlined />
                    </div>
                  </Popover>
                ) : (
                  <LegacyIcon
                    className="Layout__Trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggleMenu}
                  />
                )}
              </Header>
              <Content>{this.renderAppPage(activeRouteName)}</Content>
            </Layout>
          </Layout>
        </div>
      </Page>
    );
  }
}

export default App;
