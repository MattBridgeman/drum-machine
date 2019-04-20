let request = (url, method, responseType) => {
	// Return a new promise.
	return fetch(url, {
		method
	})
};

export { request };