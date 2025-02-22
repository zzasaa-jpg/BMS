import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix "__dirname" in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load `.env` from the correct location
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { local_storage_id } from "./local_storage_value.js";
import { local_storage_ac_no } from "./local_storage_value.js";
import { Notification } from "./notification.js";

function handleform_visibility_for_notification() {
	form.style.display = "none"
	setTimeout(() => {
		form.style.display = "flex";
		form.reset();
	}, 3500);
}

let form = document.getElementById("form");
let ac_no = document.getElementById("ac_no");
let password = document.getElementById("password");
let login_section = document.getElementById("login_section");
let dashboard_section = document.getElementById("dashboard_section");
let user_info = document.getElementById("user_info");
let logout_button = document.getElementById("logout");
let top_section = document.getElementById("top_section");
let body = document.getElementById("body");

// account number input check the digits <= 12-----------------------------------------
ac_no.addEventListener("input", function () {
	if (this.value.length > 12) {
		this.value = this.value.slice(0, 12);
	}
});

//logout function----------------------------------------------------------------------
logout_button.addEventListener("click", function () {
	location.reload()
	let id = localStorage.getItem("obj");
	login_section.style.display = "block";
	top_section.style.display = "block";
	body.style.display = "flex";
	dashboard_section.style.display = "none";
	loginTrue_PUT(id, false);
	localStorage.removeItem("obj");
	ac_no_arr = [];
});

//render the User information for dashboard-------------------------------------------
async function DOM_login_check() {
	try {
		let id = local_storage_id();
		const response = await fetch(`${process.env.URL}${process.env._2232}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id })
		});
		if (response.ok) {
			let data = await response.json();
			history();
			if (data.login_check_.login) {
				login_section.style.display = "none";
				top_section.style.display = "none";
				body.style.display = "block";
				dashboard_section.style.display = "block";
				body.style.padding = "0";
				user_info.innerHTML = `
					<h2>User-Name: <span id="user_name_span">${data.login_check_.name}</span></h2>
					<h2>Mail: <span id="mail_span">${data.login_check_.mail}</span></h2>
					<h2>Phone-No: <span id="phone_number_span">${data.login_check_.phone_number}</span></h2>
					<h2>Aadhar-No: <span id="aadhar_number_span">${data.login_check_.aadhar_number}</span></h2>
					<h2>Account-No: <span id="account_number_span">${data.login_check_.account_number}</span><h2>
					<button id="close_btn"><ion-icon name="close-circle-outline"></ion-icon></button>`;
				[document.getElementById("user_name_span"),
				document.getElementById("mail_span"),
				document.getElementById("phone_number_span"),
				document.getElementById("aadhar_number_span"),
				document.getElementById("account_number_span")].forEach(element => {
					element.style.fontWeight = "100";
				});
				let close_btn = document.getElementById("close_btn");
				close_btn.addEventListener("click", function () {
					user_info.style.transform = "translateY(-500vw)";
				});
			} else {
				login_section.style.display = "block";
				top_section.style.display = "block";
				body.style.display = "flex";
				dashboard_section.style.display = "none";
			}
		} else {
			console.error("Error on DOM login check id:", response.status);
			let errData = await response.json();
		}
	}
	catch (err) {
		console.error("Error on fetching th DOM login ID:", err);
	}
}
DOM_login_check();

//login form data post to DB-----------------------------------------------
form.addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no_value = ac_no.value;
	let password_value = password.value;
	try {
		const response = await fetch(`${process.env.URL}${process.env._7335}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ac_no_value, password_value })
		});
		if (response.ok) {
			Notification("Successful login!", "rgb(0, 255, 0)", "rgb(0,0,0)");
			handleform_visibility_for_notification()
			const data = await response.json();
			let id = data.user._id;
			let local_storage_object = {
				"id": id,
				"ac_no_": data.user.account_number,

			};
			let obj_ = JSON.stringify(local_storage_object);
			form.reset();
			localStorage.setItem("obj", obj_);
			//----------------------------------------------PIN value store in localStorage.
			let pin_value_object = {
				"pin_value": false,
				"pin": null,
			}
			let pin_obj_ = JSON.stringify(pin_value_object);
			localStorage.setItem("PIN", pin_obj_);
			if (data.user.login) {
				login_section.style.display = "none";
				top_section.style.display = "none";
				body.style.display = "block";
				dashboard_section.style.display = "block";
				location.reload();
			} else {
				login_section.style.display = "block";
				top_section.style.display = "block";
				body.style.display = "flex";
				dashboard_section.style.display = "none";
			}
			loginTrue_PUT(id, true);
			if (data.redirect) {
				window.location.href = data.redirect;
			}
		} else {
			Notification("Incorrect Account OR password number!", "rgb(255, 0, 0)", "rgb(255, 255, 255)");
			handleform_visibility_for_notification()
			console.error("Server error", response.status);
			const errData = await response.json();
			console.error(errData);
		}
	} catch (err) {
		console.error("fetch error", err);
	}
});

//change the value for login in DB---------------------------------------
async function loginTrue_PUT(id1, login_value) {
	const response2 = await fetch(`${process.env.URL}${process.env._1414}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id1, login_value })
	})
	if (response2.ok) {
		const data2 = await response2.json();
		DOM_login_check();
	} else {
		console.error("login checking id error:", response2.status);
		let errData2 = await response2.json();
	}
}

//history of transaction-------------------------------------------------------
async function history() {
	let table_body = document.getElementById("table_body");
	let table_container = document.getElementById("table_container");
	try {

		const response = await fetch(`${process.env.URL}${process.env._1311}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (response.ok) {
			table_body.innerHTML = '';
			const data = await response.json();
			//localStorage inside get the account number-----------------------------------------------------------------------------------------------
			let ac_no = local_storage_ac_no();
			//filter the data array for localStorage account number match to data array inside account number-----------------------------------
			let ac_no_values = data.filter((item) => item.account_number == ac_no);
			//filter ac_no_values checking for length is equal to ZERO--------------------------------------------------------------------------
			if (ac_no_values.length == 0) {
				table_container.style.height = "auto";
				table_body.innerHTML = `
					<tr>
						<td>No data</td>
						<td>No data</td>
						<td>No data</td>
						<td>No data</td>
						<td>No data</td>
					</tr>`;
			} else {
				if (ac_no_values.length > 10) {
					table_container.style.height = "100vh";
				}
				ac_no_values.forEach(element => {
					table_body.innerHTML += `
						<tr>
							<td>${element.dt}</td>
							<td>${element.transaction_method}</td>
							<td>${element.credit}</td>
							<td>${element.debit}</td>
							<td>${element.balance}</td>
						</tr>`;
				});
			}
		} else {
			console.err = await response.json();
			console.error("err in history api fetching", err);
		}
	} catch (err) {
		console.error("error in history api fetching");
	}
}

window.addEventListener("load", function () {
	let obj_ = localStorage.getItem("obj");
	if (obj_ !== null) {
		body.style.padding = "0";
	}
})