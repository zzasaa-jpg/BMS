import dotenv from 'dotenv';
dotenv.config();

import { Notification } from "./notification.js";
import { input_value_slice } from "./input_value_slice.js";
import { input_phone_value_slice } from "./input_phone_value_slice.js";
//--------------------user signin and save the data in database-------------------------
let input_aadhar_number = document.getElementById("adhar_number");
let input_phone_number = document.getElementById("phone_number");

//----------slice the aadhar and phone number-------------------------------------------
input_value_slice(input_aadhar_number);
input_phone_value_slice(input_phone_number);

//-----------------signin form----------------------------------------------------------
document.getElementById("form").addEventListener("submit", async function (event) {
	event.preventDefault();
	let input_name = document.getElementById("name").value;
	let input_mail = document.getElementById("mail").value;
	let input_adh_num = input_aadhar_number.value;
	let input_ph_num = input_phone_number.value;
	
	if (input_adh_num.length != 12 || input_ph_num.length != 10 || input_adh_num == 0 || input_ph_num == 0){
		Notification("Aadhar OR Phone No. Invalid!", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	try {
		let response = await fetch(`${process.env.URL}${process.env._8564}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name_value: input_name,
				mail_value: input_mail,
				aadhar_number: input_adh_num,
				phone_number: input_ph_num
			})
		});
		if (response.ok) {
			let data = await response.json();
			if (data.redirect) {
				window.location.href = data.redirect;
			}
			document.getElementById("form").reset()
		} else {
			console.error(response.status);
			let err = await response.json();
			console.error(err);
		}
	} catch (err) {
		console.error("server error", err);
	}
});
//-------------------END----------------------------------------------------------------
