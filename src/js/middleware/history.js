import createHistory from "history/createHashHistory";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();

export const historyMiddleware = routerMiddleware(history);