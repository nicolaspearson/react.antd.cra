import * as React from 'react';

import AppPage from '@components/structural/AppPage';

import './style.less';

export interface SearchProps {
	// Empty
}

interface State {
	loading: boolean;
}

class Search extends React.Component<SearchProps, State> {
	public state: State = {
		loading: true
	};

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 500);
	}

	public render() {
		return (
			<AppPage
				useLoader={true}
				spinning={this.state.loading}
				antSpinner={true}
				className={'Search__Body'}
			>
				<p>Search Page</p>
			</AppPage>
		);
	}
}

export default Search;
