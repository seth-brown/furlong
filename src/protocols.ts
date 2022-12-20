import { metricNames } from './metrics';

export type Vector = number[];
export type Distance = typeof metricNames[number] | void;
