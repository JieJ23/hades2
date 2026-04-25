import { p17data } from "./P17Data";
import { p9data } from "./P9Data";
import { p11data } from "./P11Data";
import { v1data } from "./V1data";
import { v2data } from "./V2data";
import { v3data } from "./V3data";

const today = new Date();
const target = new Date("5/4/2026");
const result = today > target;

export const bundleData = result ? [] : [...p9data, ...p11data, ...v1data, ...v2data, ...v3data, ...p17data];
export const v1bundle = [...v1data, ...v2data, ...v3data];
export const eabundle = [...p9data, ...p11data];
