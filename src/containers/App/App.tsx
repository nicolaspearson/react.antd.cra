import { Icon, Layout, Menu, Popover } from 'antd';
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

const { Header, Sider, Content } = Layout;

import './style.less';

export interface AppProps {
	children?: any;
	match?: any;
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
		menuPopoverVisible: false
	};

	constructor(props: AppProps, context?: any) {
		super(props, context);
	}

	public componentDidMount() {
		window.addEventListener('resize', this.updateDimensions.bind(this));
		setTimeout(() => {
			this.setState(() => ({
				loading: false
			}));
		}, 1000);
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	private updateDimensions() {
		this.setState(() => ({
			isNavbar: document.body.clientWidth < 770
		}));
	}

	private handleMenuPopOverClick = () => {
		this.setState(() => ({
			menuPopoverVisible: !this.state.menuPopoverVisible
		}));
	};

	private handleMenuItemClick = () => {
		if (this.state.menuPopoverVisible) {
			this.setState(() => ({
				menuPopoverVisible: false
			}));
		}
	};

	private toggleMenu = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
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
		}
		return activeKey;
	};

	private renderMenuItems(): JSX.Element[] {
		const menuItems: JSX.Element[] = [];
		menuItems.push(
			<Menu.Item key="1">
				<div onClick={this.handleMenuItemClick}>
					<RouterLink style={{ width: '100%' }} routeName={RouteNames.HOME}>
						<Icon type="home" />
						<span>Home</span>
					</RouterLink>
				</div>
			</Menu.Item>
		);
		menuItems.push(
			<Menu.Item key="2">
				<div onClick={this.handleMenuItemClick}>
					<RouterLink style={{ width: '100%' }} routeName={RouteNames.CALENDAR}>
						<Icon type="calendar" />
						<span>Calendar</span>
					</RouterLink>
				</div>
			</Menu.Item>
		);
		menuItems.push(
			<Menu.Item key="3">
				<div onClick={this.handleMenuItemClick}>
					<RouterLink style={{ width: '100%' }} routeName={RouteNames.SEARCH}>
						<Icon type="search" />
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
		}
		return <Home />;
	};

	public render() {
		const activeRouteName =
			this.props.routerStore && this.props.routerStore.activeRouteName
				? this.props.routerStore.activeRouteName
				: RouteNames.HOME;
		return (
			<Page useLoader={true} spinning={this.state.loading}>
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
							collapsible={true}
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
											<Icon type="bars" />
										</div>
									</Popover>
								) : (
										<Icon
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
