import classnames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';

import './style.less';

export interface LoaderProps {
  spinning?: boolean;
  fullscreen?: boolean;
}

const Loader = (props: LoaderProps) => (
  <div
    className={classnames('Loader__Main', {
      Loader__Hidden: !props.spinning,
      Loader__Fullscreen: props.fullscreen,
    })}
  >
    <div className="Loader__Wrapper">
      <div className="Loader__Inner" />
      <div className="Loader__Text">LOADING</div>
    </div>
  </div>
);

export default Loader;
