import { request } from "./request";

var arrayBuffer = function(url) {
	return request(url, "GET", "arraybuffer");
};

export { arrayBuffer };