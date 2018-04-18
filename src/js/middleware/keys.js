import React from "react";
export const keys = store => next => {

  return action => {
    switch(action.type){
    }
    return next(action);
  }
};