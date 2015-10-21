import { CHANGE_TRANSFORM_BY_AMOUNT } from "../constants/transformers.constants";

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