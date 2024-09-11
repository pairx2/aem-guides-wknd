function checkHash() {
	let hash = window.location.hash;
	if (hash !== "") {
		hash = hash.replace('#', '');
		let item = document.querySelector('[data-tab-type="' + hash + '"]');
		if (item) item.click();
	}
}

document.addEventListener('DOMContentLoaded', function () {
	checkHash();
	window.onhashchange = checkHash;
});