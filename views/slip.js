import { balance_fun } from "./transaction_fun.js";
import { input_value_slice } from "./input_value_slice.js";
import { input_phone_value_slice } from "./input_phone_value_slice.js";
import { Notification } from "./notification.js";

let deposit_button = document.getElementById("deposit_button");
let withdrawal_button = document.getElementById("withdrawal_button");
let cheque_button = document.getElementById("cheque_button");
let deposit_section = document.getElementById("Deposit_slip");
let withdrawal_slip_section = document.getElementById("With_drawal_slip");
let cheque_section = document.getElementById("cheque");
let form_of_deposit = document.getElementById("deposit_form");
let form_of_withdrawal_slip = document.getElementById("withdrawal_slip");
let form_of_cheque_slip = document.getElementById("cheque_form");

//deposit, withdrawal, cheque section toggle values---------------------
export let deposit_ = false;
export let withdrawal_ = false;
export let cheque_ = false;

//----------------for default open---------------
deposit_button.style.textDecoration = "Underline";

deposit_button.addEventListener("click", function () {
	deposit_ = !deposit_
	if (deposit_) {
		deposit_button.style.textDecoration = "Underline";
		withdrawal_button.style.textDecoration = "none";
		cheque_button.style.textDecoration = "none";
		deposit_section.style.display = "block";
		withdrawal_slip_section.style.display = "none";
		cheque_section.style.display = "none";
		withdrawal_ = false;
		cheque_ = false;
		form_of_withdrawal_slip.reset();
		form_of_cheque_slip.reset();
	} else {
		deposit_section.style.display = "none";
	}
});

withdrawal_button.addEventListener("click", function () {
	withdrawal_ = !withdrawal_
	if (withdrawal_) {
		withdrawal_button.style.textDecoration = "Underline";
		deposit_button.style.textDecoration = "none";
		cheque_button.style.textDecoration = "none";
		withdrawal_slip_section.style.display = "block";
		deposit_section.style.display = "none";
		cheque_section.style.display = "none";
		deposit_ = false;
		cheque_ = false;
		form_of_deposit.reset();
		form_of_cheque_slip.reset();
	} else {
		withdrawal_slip_section.style.display = "none";
	}
});

cheque_button.addEventListener("click", function () {
	cheque_ = !cheque_
	if (cheque_) {
		cheque_button.style.textDecoration = "Underline";
		deposit_button.style.textDecoration = "none";
		withdrawal_button.style.textDecoration = "none";
		cheque_section.style.display = "block";
		withdrawal_slip_section.style.display = "none";
		deposit_section.style.display = "none";
		withdrawal_ = false;
		deposit_ = false;
		form_of_withdrawal_slip.reset();
		form_of_deposit.reset();
	} else {
		cheque_section.style.display = "none";
	}

});
//---------------------------------------------------------------------

//deposit form --------------------------------------------------------
//----------------slice the aadhar and phone number--------------------
let deposit_form_ac_no = document.getElementById("deposit_form_ac_no");
input_value_slice(deposit_form_ac_no);
let deposit_form_phone_number = document.getElementById("deposit_form_phone_no");
input_phone_value_slice(deposit_form_phone_number);

form_of_deposit.addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no = Number(deposit_form_ac_no.value);
	if (deposit_form_ac_no.value.length != 12 || deposit_form_phone_number.value.length != 10 || ac_no === 0 || deposit_form_phone_number.value == 0){
		Notification("Invalid Account OR Phone No!", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	let deposit_form_amount = Number(document.getElementById("deposit_form_amount").value);
	if (deposit_form_amount === 0) {
		Notification("Invalid Amount!", "rgb(255, 0, 0)", "rgb(255,255,255)");
		return;
	}
	if (deposit_form_amount > 50000) {
		Notification("Deposit values is not >= 50000/-", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	let amount_paisa = Number(document.getElementById("amount_paisa").value);
	let total_amount;
	total_amount = deposit_form_amount + amount_paisa;
	try {
		setTimeout(() => {
			form_of_deposit.reset()
		}, 3500)
		balance_fun(ac_no, total_amount, 1, false, true, "Slip");
	} catch (error) {
		console.error("transaction error:", error);
	}
});
//-------------------------------------------------------------------------------------------------------


//Withdrawal Slip form-----------------------------------------------------------------------------------
let withdrawal_slip_ac_no = document.getElementById("withdrawal_slip_ac_no");
input_value_slice(withdrawal_slip_ac_no);

form_of_withdrawal_slip.addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no = Number(withdrawal_slip_ac_no.value);
	if (withdrawal_slip_ac_no.value.length != 12 || ac_no === 0){
		Notification("Invalid Account No!", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	let withdrawal_slip_amount = Number(document.getElementById("withdrawal_slip_amount").value);
	if (withdrawal_slip_amount === 0) {
		Notification("Invalid Amount!", "rgb(255, 0, 0)", "rgb(255,255,255)");
		return;
	}
	try {
		setTimeout(() => {
			form_of_withdrawal_slip.reset()
		}, 3500)
		balance_fun(ac_no, withdrawal_slip_amount, 2, false, true, "Slip");
	} catch (err) {
		console.error("error in withdrawal slip api: ", err);
	}

});
//-------------------------------------------------------------------------------------------------------

//Cheque form-----------------------------------------------------------------------------------
let cheque_ac_no = document.getElementById("cheque_ac_no");
input_value_slice(cheque_ac_no);

let numbers = [0, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9];
let generate_numbers = [];
for (let i = 0; i < 20; i++) {
	generate_numbers.push(numbers[Math.floor(Math.random() * 10)]);
}

let paragrapha = document.getElementById("generate_number");
paragrapha.innerText = generate_numbers.join("");

form_of_cheque_slip.addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no = Number(cheque_ac_no.value);
	if (cheque_ac_no.value.length != 12 || ac_no === 0){
		Notification("Invalid Account No!", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	let cheque_amount = Number(document.getElementById("cheque_amount").value);
	if (cheque_amount === 0) {
		Notification("Invalid Amount!", "rgb(255, 0, 0)", "rgb(255,255,255)");
		return;
	}
	try {
		setTimeout(() => {
			form_of_cheque_slip.reset()
		}, 3500)
		balance_fun(ac_no, cheque_amount, 2, true, true, "cheque");
	} catch (err) {
		console.error("error in cheque: ", err);
	}
});
//------------------------------------END------------------------------------------------------























