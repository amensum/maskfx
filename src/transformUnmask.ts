import { TransformFn, Value } from "./types";
import checkMasked from "./checkMasked";

const transformUnmask: TransformFn = ({
  mask,
  value,
  digitSymbols = ["D"],
  charSymbols = ["C"],
  specialSymbols = ["+", "-", "(", ")", "{", "}"],
}) => {
  const checkOptions = { mask, digitSymbols, charSymbols, specialSymbols };

  if (!checkMasked({ ...checkOptions, value: value })) {
    return false;
  }

  let unmaskedVal: Value = "";

  for (let i = 0; i < value.length; i++) {
    if (digitSymbols.includes(mask[i]) || charSymbols.includes(mask[i])) {
      unmaskedVal += value[i];
    }
  }

  return unmaskedVal;
};

export default transformUnmask;
