import { MaskfxPredict, PredictMode, Value } from "./types";
import checkMasked from "./maskfxCheckMasked";

const maskfxPredictForward: MaskfxPredict = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
  mode = PredictMode.Lazy,
}) => {
  const checkOptions = { mask, digitSymbols, charSymbols, specialSymbols };

  if (!checkMasked({ ...checkOptions, value: value })) {
    return false;
  }

  let forwardVal: Value = value;

  switch (mode) {
    case PredictMode.Fast:
      for (let i = 0; i < mask.length; i++) {
        if (i === forwardVal.length) {
          if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
            continue;
          }

          forwardVal += mask[i];
        }
      }
      break;
    case PredictMode.Lazy:
      for (let i = 0; i < mask.length; i++) {
        if (i === forwardVal.length - 1) {
          if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
            continue;
          }

          forwardVal = forwardVal.slice(0, i) + mask[i] + forwardVal[i];
        }
      }
      break;
  }

  if (!checkMasked({ ...checkOptions, value: forwardVal })) {
    return false;
  }

  return forwardVal;
};

export default maskfxPredictForward;
