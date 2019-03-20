import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createHashHistory();

export const historyMiddleware = routerMiddleware(history);