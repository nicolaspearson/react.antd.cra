import * as React from 'react';

import { Calendar as AntCalendar } from 'antd';

import AppPage from '@components/structural/AppPage';

import './style.less';

export interface CalendarProps {
	// Empty
}

interface State {
	loading: boolean;
}

class Calendar extends React.Component<CalendarProps, State> {
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
				className={'Calendar__Body'}
			>
				<AntCalendar />
			</AppPage>
		);
	}
}

export default Calendar;
