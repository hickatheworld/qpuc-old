const $ = function (selector) {
	const all = document.querySelectorAll(selector);
	return all.length > 1 ? all : document.querySelector(selector);
}