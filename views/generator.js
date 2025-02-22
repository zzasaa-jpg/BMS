import { Notification } from "./notification.js";
//------------------generating the New user account number and password------------------------
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let ac = [];
let password = [];
for (let i = 0; i < 12; i++) {
	ac.push(a[Math.floor(Math.random() * 9)]);
	password.push(a[Math.floor(Math.random() * 9)]);
}

let ac_H1 = document.getElementById("ac");
let password_h1 = document.getElementById("password");

async function get_users() {
	let ac_no_ = ac.join("");
	let password_ = password.join("");
	try {
		const response = await fetch("https://bms-cqx4.onrender.com/All_User");
		if (response.ok) {
			let data = await response.json();
			ac_H1.innerText = ac_no_;
			password_h1.innerText = password_;
			if (data.length === 0) {
				consolo.warn("no users found in the database");
				return;
			}
			const response1 = await fetch("https://bms-cqx4.onrender.com/generator", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: data[data.length - 1]._id, ac_no: ac_no_, password_value: password_ })
			});
			if (response1.ok) {
				let data1 = await response1.json();
			} else {
				let err1 = await response1.json();
				console.error("fetching error for generator", err1)
			}
		} else {
			let err = await response.json();
			console.error(err);
		}

	} catch (err) {
		console.error("fetching error on all users: ", err);
	}
}
get_users();

let copy_ac = document.getElementById("ac_btn");
let copy_password = document.getElementById("password_btn");

copy_ac.addEventListener("click", function () {
	button_disabled(ac_H1.innerText, copy_ac, copy_password)
});
copy_password.addEventListener("click", function () {
	button_disabled(password_h1.innerText, copy_ac, copy_password)

});

function button_disabled(copy_value, button_ac, button_password) {
	navigator.clipboard.writeText(copy_value);
	Notification("Copyed!", "rgb(0, 255, 0)", "rgb(0,0,0)");
	button_ac.disabled = true;
	button_password.disabled = true;
	let buttons_time = setTimeout(() => {
		button_ac.disabled = false;
		button_password.disabled = false;
		return clearTimeout(buttons_time)
	}, 3500)
}
//-----------------------------END-------------------------------------------------------------