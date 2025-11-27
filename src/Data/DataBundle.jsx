import { p9data } from "./P9Data";
import { p11data } from "./P11Data";
import { v1data } from "./V1data";
import { v2data } from "./V2data";

export const bundleData = [...p9data, ...p11data, ...v1data, ...v2data];
export const v1bundle = [...v1data, ...v2data];
export const eabundle = [...p9data, ...p11data];
