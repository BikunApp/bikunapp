import { BikunBiru } from "./bikunJalurBiru";
import { BikunMerah } from "./bikunJalurMerah";

export const DataHalteDanJalur = [
  {
    label: "Both",
    content: BikunBiru.concat(BikunMerah),
  },
  {
    label: "Blue Line",
    content: BikunBiru,
  },
  {
    label: "Red Line",
    content: BikunMerah,
  },
];
