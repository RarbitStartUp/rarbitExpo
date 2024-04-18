import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to rarbit.web.ts
// and on native platforms to rarbit.ts
import rarbitModule from './src/rarbitModule';
import rarbitView from './src/rarbitView';
import { ChangeEventPayload, rarbitViewProps } from './src/rarbit.types';

// Get the native constant value.
export const PI = rarbitModule.PI;

export function hello(): string {
  return rarbitModule.hello();
}

export async function setValueAsync(value: string) {
  return await rarbitModule.setValueAsync(value);
}

const emitter = new EventEmitter(rarbitModule ?? NativeModulesProxy.rarbit);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { rarbitView, rarbitViewProps, ChangeEventPayload };
