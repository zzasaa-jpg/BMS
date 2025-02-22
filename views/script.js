let header_ = document.getElementById("header");
let welcome_section = document.getElementById("welcome_section");
let bank_service = document.getElementById("bank_service");
let table = document.getElementById("table");

window.addEventListener("load", function () {
	header_.style.transform = "translateY(0px)";
	header_.style.transition = "all 500ms 500ms";
	welcome_section.style.transform = "translateX(0)";
	welcome_section.style.transition = "all 1.2s 500ms";
});



function myFunction(x) {
	if (x.matches) { // If media query matches
		window.addEventListener("scroll", function () {
			let middlePosition = bank_service.getBoundingClientRect().top;
			let bottomPosition = bank_service.getBoundingClientRect().bottom;

			if (middlePosition <= window.innerHeight / 2) {
				bank_service.style.opacity = "1";
				bank_service.style.transform = "translateX(0px)";
			} else {
				bank_service.style.opacity = "0";
				bank_service.style.transform = "translateX(-100vw)";
			}

			if (bottomPosition <= window.innerHeight / 2) {
				table.style.transform = "translateX(0px)";
			} else {
				table.style.transform = "translateX(-1000vw)";
			}
		});

	} else {
		window.addEventListener("scroll", function () {
			let middlePosition = bank_service.getBoundingClientRect().top;
			let bottomPosition = bank_service.getBoundingClientRect().bottom;

			if (middlePosition <= window.innerHeight / 2) {
				bank_service.style.opacity = "1";
				bank_service.style.transform = "scale(1)";
			} else {
				bank_service.style.opacity = "0";
				bank_service.style.transform = "scale(0.5)";
			}

			if (bottomPosition <= window.innerHeight / 2) {
				table.style.transform = "translateX(0px)";
			} else {
				table.style.transform = "translateX(-1000vw)";
			}
		});
	}
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 1024px)")

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
	myFunction(x);
});