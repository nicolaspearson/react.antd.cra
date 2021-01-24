import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classnames from 'classnames';
import * as React from 'react';

import Loader from '@components/structural/Loader';

import './style.less';

const antSpinnerIcon = (
  <LoadingOutlined
    style={{
      fontSize: 32,
      color: '#30b8b8',
    }}
    spin
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
  overflow: 'auto',
};

function renderSpinnerOrLoader(props: AppPageProps) {
  if (props.antSpinner) {
    return (
      <section
        className={classnames('Spinner__Container', {
          Spinner__Hidden: !props.spinning,
        })}
      >
        <Spin style={{ display: 'flex' }} indicator={antSpinnerIcon} />
      </section>
    );
  }
  return <Loader spinning={props.spinning} />;
}

const AppPage = (props: AppPageProps) => (
  <section
    className={classnames(props.className, {
      AppPage__ContentInner: props.inner,
    })}
    style={props.useLoader ? loaderStyle : undefined}
  >
    {props.useLoader ? renderSpinnerOrLoader(props) : undefined}
    {props.children}
  </section>
);

export default AppPage;
