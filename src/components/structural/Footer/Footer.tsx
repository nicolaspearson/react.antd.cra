// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';

import './style.less';

const Footer = () => (
  <footer className="Footer">
    <div className="Footer__Content">{`v. ${process.env.REACT_APP_VERSION}`}</div>
  </footer>
);

export default Footer;
