import type { HTMLProps } from 'react';
import React from 'react';

const ListRow = function Item(props: HTMLProps<HTMLDivElement>) {
  return <div {...props} data-row />
}

export default React.memo(ListRow);