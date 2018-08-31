let arrayBuffer = url => {
	return fetch(url)
		.then(response =>
			response.arrayBuffer()	
		);
};

export { arrayBuffer };