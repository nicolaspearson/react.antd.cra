// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';

import HtmlHead from '@components/functional/HtmlHead';

const Head = ({ children }: any) => (
  <HtmlHead>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    {children}
  </HtmlHead>
);

Head.displayName = 'Head';

export default Head;
