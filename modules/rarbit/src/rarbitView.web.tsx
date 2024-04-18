import * as React from 'react';

import { rarbitViewProps } from './rarbit.types';

export default function rarbitView(props: rarbitViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
