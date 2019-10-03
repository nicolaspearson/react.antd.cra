import { Icon, Spin } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

import Loader from '@components/structural/Loader';

import './style.less';

const antSpinnerIcon = (
	<Icon
		type="loading"
		style={{
			fontSize: 32,
			color: '#30b8b8'
		}}
		spin={true}
	/>
);

export interface AppPageProps {
	children?: any;
	className?: string;
	useLoader?: boolean;
	inner?: boolean;
	spinning?: boolean;
	antSpinner?: boolean;
}

const loaderStyle = {
	minHeight: '100%',
	overflow: 'auto'
};

const AppPage = (props: AppPageProps) => {
	return (
		<section
			className={classnames(props.className, {
				AppPage__ContentInner: props.inner
			})}
			style={props.useLoader ? loaderStyle : undefined}
		>
			{props.useLoader ? (
				props.antSpinner ? (
					<section
						className={classnames('Spinner__Container', {
							Spinner__Hidden: !props.spinning
						})}
					>
						<Spin style={{ display: 'flex' }} indicator={antSpinnerIcon} />
					</section>
				) : (
					<Loader spinning={props.spinning} />
				)
			) : (
				undefined
			)}
			{props.children}
		</section>
	);
};

export default AppPage;
