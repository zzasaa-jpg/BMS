require('dotenv').config();
//----import the some function form js files-----------------------
import { balance_fun } from "./transaction_fun.js";
import { debit_card_generate } from "./debit_card_generate_number.js";
import { local_storage_ac_no } from "./local_storage_value.js";
import { local_storage_pin_ } from "./local_storage_value.js";
import { local_storage_pin_value } from "./local_storage_value.js";
import { input_value_slice } from "./input_value_slice.js";
import { Notification } from "./notification.js";
//-----------------------------------------------------------------

//----initialize variables-----------------------------------------
let pin_value, parse, pin;
let change = false;
let receipt_data;
let blinker_interval;
let count_value = 5;
let cancel_section;
//-----------------------------------------------------------------

//------------ATM Card generate random numbers and calling the number generate function-------- 
let random_number_1 = document.getElementById("random_number-1");
let random_number_2 = document.getElementById("random_number-2");
let random_number_3 = document.getElementById("random_number-3");
let random_number_4 = document.getElementById("random_number-4");
debit_card_generate(random_number_1, random_number_2, random_number_3, random_number_4);
//---------------------------------------------------------------------------------------------

//-----------------getting the id's from html tags----------------------------------------------------------------------
let body = document.querySelector(".body");
let message_for_insert_the_card = document.getElementById("message_for_insert_the_card");
let welcome_message = document.getElementById("welcome_message");
let Use_ATM_btn = document.getElementById("Use_ATM_btn");
let card_btn = document.getElementById("card_btn");
let card_body = document.getElementById("card_body");
let success_message = document.getElementById("success_message");
let withdrawal = document.getElementById("withdrawal");
let deposit = document.getElementById("deposit");
let atm_deposit_form = document.getElementById("atm_deposit_form");
let atm_withdrawal_form = document.getElementById("atm_withdrawal_form");
let balance_info = document.getElementById("balance_info");
let pin_change = document.getElementById("pin_change");
let atm_pin_change_form = document.getElementById("atm_pin_change_form");
let pin_generate = document.getElementById("pin_generate");
let atm_pin_generate_form = document.getElementById("atm_pin_generate_form");
let change_account_number_in_ATM_deposit_form = document.getElementById("change_account_number_in_ATM_deposit_form");
let receipt = document.getElementById("receipt");
let atm_new_password_generate = document.getElementById("atm_new_password_generate");
let atm_re_enter_new_password_generate = document.getElementById("atm_re_enter_new_password_generate");
let atm_password_current = document.getElementById("atm_password_current");
let atm_password_new = document.getElementById("atm_password_new");
let atm_re_enter = document.getElementById("atm_re_enter");
let atm_card_password = document.getElementById("atm_card_password");
let atm_display = document.getElementById("atm_display");
let re_use_atm_btn = document.getElementById("re_use_atm_btn");
let cancel = document.getElementById("cancel");
let no_thanks_btn = document.getElementById("no_thanks_btn");
let pin_enter_form = document.getElementById("pin_enter_form");
let stop_btn = document.getElementById("stop_atm");
let card_indicater = document.getElementById("card_indicater");
let count = document.getElementById("count");
let atm_account_number_for_deposit = document.getElementById("atm_account_number_for_deposit");
//--------------------------------------------------------------------------------------------------------------------

//-----checking the ATM PIN was generated or no-----------------------------------------------------------------------
pin_value = localStorage.getItem("PIN");
parse = JSON.parse(pin_value);
if (parse.pin_value == false) {
	if (confirm("Generate the PIN")) {
		Use_ATM_btn.style.display = "none";
		welcome_message.style.display = "none";
		atm_pin_generate_form.style.display = "block";
	} else {
		Notification("Generate PIN first!", "rgb(255, 0, 0)", "rgb(255, 255, 255)");
		Use_ATM_btn.disabled = true;
		let notification = setTimeout(() => {
			location.reload();
			return clearTimeout(notification);
		}, 3500)
	}
}
//-------------------------------------------------------------------------------------------------------------------

//------------------ATM transaction options show---------------------------------------------------------------------
function show_transaction_opt() {
	[withdrawal, deposit, balance, pin_change, pin_generate].forEach(element => {
		element.style.display = "block";
		element.style.marginBottom = "5px";
		element.style.border = "1px solid #0073E6";
	});

	[withdrawal, deposit, balance].forEach(element => {
		element.style.position = "absolute";
		element.style.left = "-2px";
		element.style.textAlign = "left";
		element.style.borderTopRightRadius = "5px";
		element.style.borderBottomRightRadius = "5px";
		element.style.borderTopLeftRadius = "0px";
		element.style.borderBottomLeftRadius = "0px";
	});


	[pin_change, pin_generate].forEach(element => {
		element.style.position = "absolute";
		element.style.right = "-2px";
		element.style.textAlign = "right";
		element.style.borderTopLeftRadius = "5px";
		element.style.borderBottomLeftRadius = "5px";
		element.style.borderTopRightRadius = "0px";
		element.style.borderBottomRightRadius = "0px";
	});

	function myFunction(x) {
		if (x.matches) { // If media query matches
			[withdrawal, deposit, balance, pin_change, pin_generate].forEach(element => {
				element.style.fontSize = "25px";
			});

			[withdrawal, deposit, balance].forEach(element => {
				element.style.width = "auto";
			});

			withdrawal.style.top = "45px";
			deposit.style.top = "125px";
			balance.style.top = "205px";

			[pin_change, pin_generate].forEach(element => {
				element.style.width = "auto";
			});

			pin_change.style.top = "45px";
			pin_generate.style.top = "205px";
		} else {
			[withdrawal, deposit, balance, pin_change, pin_generate].forEach(element => {
				element.style.fontSize = "30px";
			});

			[withdrawal, deposit, balance].forEach(element => {
				element.style.width = "250px";
			});

			withdrawal.style.top = "75px";
			deposit.style.top = "175px";
			balance.style.top = "275px";

			[pin_change, pin_generate].forEach(element => {
				element.style.width = "250px";
			});
			pin_change.style.top = "75px";
			pin_generate.style.top = "175px";
		}
	}

	// Create a MediaQueryList object
	var x = window.matchMedia("(max-width: 900px)")

	// Call listener function at run time
	myFunction(x);

	// Attach listener function on state changes
	x.addEventListener("change", function () {
		myFunction(x);
	});
}
//------------------------------------------------------------------------------------------------------------------

//-----------------------------User Start OR Use ATM by Button------------------------------------------------------
Use_ATM_btn.addEventListener("click", function () {
	Use_ATM_btn.style.display = "none";
	welcome_message.style.display = "none";
	message_for_insert_the_card.style.display = "block";
	card_btn.style.display = "block";
	stop_btn.disabled = false;

});
//-----------------------------------------------------------------------------------------------------------------

//---------------------------ATM withdrawal form-------------------------------------------------------------------
document.getElementById("atm_withdrawal_form").addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no = local_storage_ac_no();
	let atm_amount_for_withdrawal = Number(document.getElementById("atm_amount_for_withdrawal").value);
	if (atm_amount_for_withdrawal === 0) {
		Notification("Invalid Amount!", "rgb(255, 0, 0)", "rgb(255, 255, 255)");
		return;
	}
	try {
		balance_fun(ac_no, atm_amount_for_withdrawal, 2, false, false, "ATM", true);
	} catch (err) {
		console.error("error in withdrawal atm machine api: ", err);
	}
});
//----------------------------------------------------------------------------------------------------------------

//-------checking the withdrawal form inside change account number button click is true or false------------------
change_account_number_in_ATM_deposit_form.addEventListener("click", function () {
	change = true;
	atm_account_number_for_deposit.style.display = "block";
	change_account_number_in_ATM_deposit_form.style.display = "none";
});
//-------------------------ATM deposit form-----------------------------------------------------------------------
input_value_slice(atm_account_number_for_deposit);
document.getElementById("atm_deposit_form").addEventListener("submit", async function (event) {
	event.preventDefault();
	let ac_no;
	if (change) {
		let atm_account_number_for_deposit = Number(document.getElementById("atm_account_number_for_deposit").value);
		ac_no = atm_account_number_for_deposit;
		if (document.getElementById("atm_account_number_for_deposit").value.length != 12 || ac_no === 0){
				Notification("Invalid Account No!", "rgb(255, 255, 0)", "rgb(0,0,0)");
				return;
		}
	} else {
		ac_no = local_storage_ac_no();
	}

	let atm_amount_for_deposit = Number(document.getElementById("atm_amount_for_deposit").value);
	if (atm_amount_for_deposit === 0 || atm_amount_for_deposit > 50000) {
		Notification("Deposit values is not >= 50000/-", "rgb(255, 255, 0)", "rgb(0,0,0)");
		return;
	}
	try {
		balance_fun(ac_no, atm_amount_for_deposit, 1, false, true, "ATM", true);
	} catch (err) {
		console.error("error in deposit atm machine api: ", err);
	}
});
//---------------------------------------------------------------------------------------------------------------

//--------------------------User Account balance checking--------------------------------------------------------
balance.addEventListener("click", async function () {
	const response = await fetch(`${process.env.URL}${process.env._1311}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	});
	if (response.ok) {
		const data = await response.json();
		//localStorage inside get the account number--------------
		let ac_no = local_storage_ac_no();

		//filter the data array for localStorage account number match to ac_no-------------------
		let ac_no_values = data.filter((item) => item.account_number == ac_no);
		if (ac_no_values.length == 0) {
			atm_balance.innerHTML = "Your balance is Zero Deposit money.";
		} else {
			atm_balance.innerHTML = `Your balance &#8377 ${ac_no_values[ac_no_values.length - 1].balance}`;
		}
	}
});
//---------------------------------------------------------------------------------------------------------------

//-----------------------ATM Pin is generated OR no checkcing----------------------------------------------------
pin_generate.addEventListener("click", function () {
	pin_generate.disabled = true;
	let pin_check__ = local_storage_pin_value();
	if (pin_check__) {
		Notification("PIN alredy generated!", "rgb(255, 255, 0)", "rgb(0, 0, 0)");
		let pin_generate_btn_time = setTimeout(() => {
			pin_generate.disabled = false;
			return clearTimeout(pin_generate_btn_time)
		}, 3500);
		return;
	}
});
//---------------------ATM Pin generated form--------------------------------------------------------------------
atm_pin_generate_form.addEventListener("submit", function (event) {
	event.preventDefault();
	if (atm_new_password_generate.value != atm_re_enter_new_password_generate.value) {
		Notification("Invalid Password!", "rgb(255, 0, 0)", "rgb(255, 255, 255)");
	} else {
		let PIN = {
			"pin_value": true,
			"pin": atm_new_password_generate.value,
		}
		let pin_ = JSON.stringify(PIN);
		localStorage.setItem("PIN", pin_);
		Notification("PIN Generated!", "rgb(0, 255, 0)", "rgb(0, 0, 0)");
		atm_pin_generate_form.reset();
		atm_pin_generate_form.style.display = "none";
		Use_ATM_btn.style.display = "block";
		welcome_message.style.display = "block";
	}
});
//---------------------------------------------------------------------------------------------------------------

//--------------------ATM Pin change button----------------------------------------------------------------------
pin_change.addEventListener("click", function () {
	transaction_btn_logic(atm_pin_change_form);
	cancel_section = atm_pin_change_form;
	cancel_section.reset();
});
//-------------------ATM Pin change form-------------------------------------------------------------------------
atm_pin_change_form.addEventListener("submit", function (event) {
	event.preventDefault();
	pin = local_storage_pin_();
	if (pin == atm_password_current.value) {
		if (atm_password_new.value == pin || atm_re_enter.value == pin) {
			Notification("Enter a New password!", "rgb(255, 255, 0)", "rgb(0,0,0)");
			Hide_the_atm_pin_change_form();
		}
		if (atm_password_new.value != atm_re_enter.value) {
			Notification("Invalid password!", "rgb(255, 255, 0)", "rgb(0,0,0)");
			Hide_the_atm_pin_change_form();
		} else {
			let PIN = {
				"pin_value": true,
				"pin": atm_password_new.value,
			}
			let pin_ = JSON.stringify(PIN);
			localStorage.setItem("PIN", pin_);
			Notification("PIN changed!", "rgb(0, 255, 0)", "rgb(0,0,0)");
			cancel_section.style.display = "none";
			show_transaction_opt();
			re_use_atm_btn.style.display = "none";
			success_message.style.display = "none";
		}
	} else {
		Notification("Enter your current password!", "rgb(255, 255, 0)", "rgb(0,0,0)");
		Hide_the_atm_pin_change_form();
	}
});
function Hide_the_atm_pin_change_form() {
	atm_pin_change_form.style.display = "none";
	setTimeout(() => {
		atm_pin_change_form.style.display = "block";
	}, 3500);
}
//---------------------------------------------------------------------------------------------------------------

//----------------------------transaction logic function---------------------------------------------------------
//----------this function render only user click option form----------- 
function transaction_btn_logic(current_section) {
	current_section.style.display = "block";
	[withdrawal, deposit, balance, pin_change, pin_generate].forEach(element => {
		element.style.display = "none";
	});

}
//---------------------------------------------------------------------------------------------------------------

//----------exporting the remove_section for ATM withdralwal OR deposit form results status code-200 than this function work----------
//----------one line logic was user move to transaction complete section and user choice for reuse atm for end the transaction--------
export function remove_section(message, current_, res) {
	receipt_data = res;
	if (1) {
		atm_withdrawal_form.style.display = "none";
		atm_withdrawal_form.reset();
	}
	if (2) {
		atm_deposit_form.style.display = "none";
		atm_deposit_form.reset();
	}
	success_message.style.display = "block";
	success_message.innerText = message;
	re_use_atm_btn.style.display = "block";
	re_use_atm_btn.addEventListener("click", function () {
		show_transaction_opt();
		success_message.style.display = "none";
		re_use_atm_btn.style.display = "none";
		no_thanks_btn.style.display = "none";
	});
	no_thanks_btn.style.display = "block";
}
//------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------withdrawal button-------------------------
withdrawal.addEventListener("click", function () {
	transaction_btn_logic(atm_withdrawal_form);
	cancel_section = atm_withdrawal_form;
	cancel_section.reset();
});
//---------------------------------------------------------------------------

//---------------------------deposit button----------------------------------
deposit.addEventListener("click", function () {
	transaction_btn_logic(atm_deposit_form);
	cancel_section = atm_deposit_form;
	cancel_section.reset();
	atm_account_number_for_deposit.style.display = "none";
	change_account_number_in_ATM_deposit_form.style.display = "block";
	change = false;
});
//---------------------------------------------------------------------------

//--------------------------balance button-----------------------------------
balance.addEventListener("click", function () {
	transaction_btn_logic(balance_info);
	re_use_atm_btn.style.display = "block";
	re_use_atm_btn.addEventListener("click", function () {
		show_transaction_opt();
		balance_info.style.display = "none";
		re_use_atm_btn.style.display = "none";
	});
	cancel_section = balance_info;
});
//---------------------------------------------------------------------------

//------------------------cancel button--------------------------------------
cancel.disabled = true;
cancel.addEventListener("click", function () {
	cancel_section.style.display = "none";
	show_transaction_opt();
	re_use_atm_btn.style.display = "none";
	success_message.style.display = "none";
	no_thanks_btn.style.display = "none";
});
//---------------------------------------------------------------------------

//---------------------no thanks button--------------------------------------
no_thanks_btn.addEventListener("click", function () {
	Transaction_receipt(receipt_data);
	atm_body.style.display = "none";
	count.style.display = "block";
	let count_interval = setInterval(() => {
		count_value = count_value - 1;
		if (count_value == 0) {
			clearInterval(count_interval);
			count.style.display = "none";
			count_value = 5;
		}
		count.innerText = count_value;
	}, 1000);
	count.innerText = count_value;
	setTimeout(() => {
		function myFunction(x) {
			if (x.matches) { // If media query matches
				body.style.display = "block";
			} else {
				body.style.display = "flex";
			}
		}

		// Create a MediaQueryList object
		var x = window.matchMedia("(max-width: 900px)")

		// Call listener function at run time
		myFunction(x);

		// Attach listener function on state changes
		x.addEventListener("change", function () {
			myFunction(x);
		});
		atm_body.style.display = "flex";
		[Use_ATM_btn, welcome_message].forEach((element) => {
			element.style.display = "block";
		});

		[re_use_atm_btn, balance_info, success_message, no_thanks_btn, receipt].forEach((element) => {
			element.style.display = "none";
		});
		cancel.disabled = true;
		blinker();
		stop_btn.disabled = true;
	}, 5000);
});
//-------------------------------------------------------------------------

//----------------Transaction Receipt function----------------------------------------
//------------for User transaction done lastly render the receipt for 5 seconds-------
function Transaction_receipt(res) {
	body.style.display = "flex";
	receipt.style.display = "block";
	let receipt_date = document.getElementById("receipt_date");
	let receipt_account_number = document.getElementById("receipt_account_number");
	let receipt_table_body = document.getElementById("receipt_table_body");
	receipt_date.innerText = `Date: ${new Date().toLocaleDateString()}`;
	let arr = [];
	arr.push(res.history_.account_number);
	let arr_value = arr[0].toString().split("");
	receipt_account_number.innerText = `AC-No: ${arr_value[0]}${arr_value[1]}XXXXXXXX${arr_value[arr_value.length - 2]}${arr_value[arr_value.length - 1]}`;
	receipt_table_body.innerHTML = `<td>${new Date().toLocaleString()}</td><td>${res.history_.transaction_method}</td><td>${res.history_.balance}</td>`;
}
//------------------------------------------------------------------------------------

//------------------------stop button for stop the ATM--------------------------------------------------------------------------
stop_btn.disabled = true;
stop_btn.addEventListener("click", function () {
	clearInterval_function_();
	blinker();
	stop_btn.disabled = true;
	Use_ATM_btn.style.display = "block";
	welcome_message.style.display = "block";
	[
		re_use_atm_btn,
		balance_info,
		success_message,
		no_thanks_btn,
		receipt,
		withdrawal,
		deposit,
		balance,
		pin_change,
		pin_generate,
		message_for_insert_the_card,
		card_btn,
		card_body,
		pin_enter_form,
		withdrawal,
		deposit,
		balance,
		pin_change,
		pin_generate
	].forEach((element) => {
		element.style.display = "none";
	});
	cancel.disabled = true;
	[
		pin_enter_form,
		atm_withdrawal_form,
		atm_deposit_form,
		atm_pin_change_form,
		atm_pin_generate_form
	].forEach(element => {
		element.style.display = "none"
		element.reset();
	});
});
//-------------------------------------------------------------------------------------------------------------------------------

//-----------------------ATM card button---------------------
card_btn.addEventListener("click", function () {
	card_body.style.display = "block";
	card_body.style.zIndex = "2";
	pin_enter_form.style.display = "block";
	message_for_insert_the_card.style.display = "none";
	pin_enter_form.style.display = "block";
	pin_enter_form.style.fontSize = "15px";
	function myFunction(x) {
		if (x.matches) { // If media query matches
			body.style.display = "block"
			atm_body.style.marginTop = "50px";
		} else {
			body.style.display = "flex"
			atm_body.style.marginTop = "100px";
		}
	}

	// Create a MediaQueryList object
	var x = window.matchMedia("(max-width: 900px)")

	// Call listener function at run time
	myFunction(x);

	// Attach listener function on state changes
	x.addEventListener("change", function () {
		myFunction(x);
	});
});
//-----------------------------------------------------------

//------blinker function for ATM card inserted OR no----------------------------------------
function blinker() {
	let isGreen = true;
	blinker_interval = setInterval(() => {
		card_indicater.style.backgroundColor = isGreen ? "#00ff00" : "transparent";
		isGreen = !isGreen;
	}, 800);
}
blinker();
//------------------------------------------------------------------------------------------

//--------------------User pin enter for transaction----------------------------------------
pin_enter_form.addEventListener("submit", function (event) {
	event.preventDefault();
	pin = local_storage_pin_();
	if (atm_card_password.value == pin) {
		[pin_enter_form, card_body, card_btn].forEach(element => {
			element.style.display = "none";
		});
		show_transaction_opt();
		cancel.disabled = false;
		clearInterval_function_();
		atm_display.style.alignItems = "center";
	} else {
		Notification("Invalid PIN!", "rgb(255, 0, 0)", "rgb(255,255,255)");
		pin_enter_form.style.display = "none";
		setTimeout(() => {
			pin_enter_form.style.display = "block";
		}, 3500);
	}
	pin_enter_form.reset();
});
//-----------------------------------------------------------------------------------------

//---------------------clear Setinterval in blinker()--------------------------------------
function clearInterval_function_() {
	clearInterval(blinker_interval);
	card_indicater.style.backgroundColor = "transparent";
	blinker_interval = null;
}
//--------------------------------END------------------------------------------------------
