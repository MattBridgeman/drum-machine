import { CHANGE_TRANSFORM_BY_AMOUNT, CHANGE_TRANSFORM_TO_AMOUNT } from "../constants/transformers.constants";

//transformer
export function changeTransformByAmount(transformId, amount){
  return {
    type: CHANGE_TRANSFORM_BY_AMOUNT,
    value: {
      transformId,
      amount
    }
  };
}

export function changeTransformToAmount(transformId, value){
  return {
    type: CHANGE_TRANSFORM_TO_AMOUNT,
    value: {
      transformId,
      value
    }
  };
}