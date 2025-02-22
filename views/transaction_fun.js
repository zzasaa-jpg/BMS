import { local_storage_ac_no } from "./local_storage_value.js";
import { Notification } from "./notification.js";
let value_ = 0;

//-----Three functions are connected Each---------------------------------------------------------------------
//--------------------export the function for transaction from ATM and Slip's---------------------------------
export async function balance_fun(ac_no0, amount_, value, cheque_value, change, ATM_or_Slip) {
	if (value == 1) {
		value_ = 2;
	} else {
		value_ = 1;
	}
	const response1 = await fetch("https://bms-cqx4.onrender.com/balance", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response1.ok) {
		let ac_no;
		const results1 = await response1.json();
		//localStorage inside get the account number------------------------------------------------------------------------
		if (change) {
			ac_no = ac_no0;
		} else {
			ac_no = local_storage_ac_no();
		}
		//filter the results1 array for localStorage account number match to results1 array inside account number----------------------
		let ac_no_values = results1.filter((item) => item.account_number == ac_no);
		let balance;
		let credit_ = [];
		let debit_ = [];
		if (value == 1) {
			if (ac_no_values.length === 0) {
				balance = amount_;
				if (ATM_or_Slip == "ATM") {
					transaction(balance, ac_no, "Deposit by ATM", amount_, "0", true);
					return;
				} else {
					transaction(balance, ac_no, "Deposit Slip", amount_, "0", false);
					return;
				}
			}
		} else if (value == 2) {
			if (ac_no_values.length === 0 || ac_no_values[ac_no_values.length - 1].balance == 0 || Math.floor(ac_no_values[ac_no_values.length - 1].balance) === 0 && ac_no_values[ac_no_values.length - 1].balance >= 0) {
				Notification("Deposity the money, your balance is ZERO.", "rgb(255, 0, 0)", "rgb(255,255,255)");
				return;
			}
		}
		ac_no_values.forEach(el => {
			credit_.push(el.credit);
			debit_.push(el.debit);
		});
		//--------------------------------------------
		let debit_sum = 0;
		for (let i = 0; i < debit_.length; i++) {
			debit_sum = debit_sum + debit_[i];
		}
		//--------------------------------------------
		let sum = 0;
		for (let i = 0; i < credit_.length; i++) {
			sum = sum + credit_[i];
		}
		//--------------------------------------------
		if (value == 1) {
			balance = (sum + amount_) - debit_sum;
			if (ATM_or_Slip == "ATM") {
				transaction(balance, ac_no, "Deposit by ATM", amount_, "0", true);
			} else {
				transaction(balance, ac_no, "Deposit Slip", amount_, "0", false);
			}
		} else {
			if (ac_no_values[ac_no_values.length - 1].balance < amount_) {
				Notification("Invalid Amount!.", "rgb(255, 0, 0)", "rgb(255,255,255)");
				return;
			} else {
				balance = (sum - debit_sum) - amount_;
				if (cheque_value) {
					transaction(balance, ac_no, "Cheque", "0", amount_, false);
					return;
				}
				if (ATM_or_Slip == "ATM") {
					transaction(balance, ac_no, "Withdrawal By ATM", "0", amount_, true);
				} else {
					transaction(balance, ac_no, "Withdrawal Slip", "0", amount_, false);
				}
			}
		}
		return response1.status;
	} else {
		const error1 = await response1.json();
		console.error("transaction error", error1);
	}
}

//-----------------------------------------------------------------------------------------------------------------------------

//-----------------transaction function for update realtime User balance------------------------------------------------------- 
async function transaction(balance, deposit_form_ac_no, method, credit, debit, atm_message_value) {
	const response = await fetch("https://bms-cqx4.onrender.com/transaction", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ balance, deposit_form_ac_no })
	});
	if (response.ok) {
		const results = await response.json();
		if (results.transaction === null) {
			Notification("Invalid Account number!.", "rgb(255, 0, 0)", "rgb(255,255,255)");
			return;
		} else {
			History(method, credit, debit, balance, deposit_form_ac_no, atm_message_value);

		}
	} else {
		const error = await response.json();
		console.error("transaction error", error);
	}
}
//-----------------------------------------------------------------------------------------------------------------------------

//-----------History function for Save User Transaction history----------------------------------------------------------------
async function History(transaction_method, credit, debit, balance, account_number, atm_message_value) {
	let Date_ = new Date();
	let date_time = Date_.toLocaleString();
	try {
		if (!transaction_method || debit == null || credit == null || balance == null) {
			console.error("missing");
			return;
		}
		const response = await fetch("https://bms-cqx4.onrender.com/history", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ date_time, transaction_method, credit, debit, balance, account_number })
		});
		if (response.ok) {
			let mes;
			if (transaction_method === "Deposit Slip" || transaction_method === "Deposit by ATM") {
				mes = "Successful Deposited!";
			} else if (transaction_method === "Withdrawal Slip" || transaction_method === "Withdrawal By ATM") {
				mes = "Successful Withdrawal!";
			} else {
				mes = "Successful cheque accepted!";
			}
			Notification(mes, "rgb(0, 255, 0)", "rgb(0,0,0)");
			const results = await response.json();
			if (atm_message_value) {
				const { remove_section } = await import("./atm.js");
				if (value_ == 1) {
					remove_section("Successful withdrawal money", 1, results);
				} else {
					remove_section("Successful Deposit money", 2, results)
				}
			}
		} else {
			const error = await response.json();
			console.error("Data post error", error);
		}
	} catch (error) {
		console.error("Data post error:", error);
	}
}
//--------------------------------------------------END------------------------------------------------------------------------
