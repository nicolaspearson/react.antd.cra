// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';

import logoImage from '@assets/images/svg/logo.svg';

import './style.less';

export interface LogoProps {
  width?: string;
  height?: string;
}

const Logo = (props: LogoProps) => (
  <img
    className="Logo__Main"
    style={{ width: props.width, height: props.height }}
    src={logoImage}
    alt="Logo"
  />
);

export default Logo;
