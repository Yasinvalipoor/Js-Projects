const $ = document;
const title = $.getElementById("keyCode");
const locationKey = $.getElementById("location");
const key = $.getElementById("key");
const which = $.getElementById("which");
const code = $.getElementById("code");

document.body.addEventListener("keydown", function (event) {
	event.preventDefault();

	starter.style.display = "none";
	heading.style.display = "flex";
	ascii.style.display = "flex";
	infos.style.display = "flex";

	title.innerHTML = event.code;
	locationKey.innerHTML = event.location;
	key.innerHTML = event.key;
	which.innerHTML = event.which;
	code.innerHTML = event.code;
});