import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { rarbitViewProps } from './rarbit.types';

const NativeView: React.ComponentType<rarbitViewProps> =
  requireNativeViewManager('rarbit');

export default function rarbitView(props: rarbitViewProps) {
  return <NativeView {...props} />;
}
