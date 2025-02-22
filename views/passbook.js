//---------------------------------User passbook details show-----------------------------
import { local_storage_ac_no } from "./local_storage_value.js";
let passbook = document.getElementById("passbook_body");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let table_body = document.getElementById("table_body");


//--------------passbook interface render according of arr index--------------------------
let arr = ["passbook_body", "transaction_info"];
let count = 0;

render(document.getElementById(arr[count]))
previous.addEventListener("click", function () {
	if (count > 0) {
		document.getElementById(arr[count]).style.display = "none";
		count -= 1;
		render(document.getElementById(arr[count]));
	} else if (count == 0) {
		document.getElementById(arr[count]).style.display = "none";
		count = arr.length - 1;
		render(document.getElementById(arr[count]));
		document.getElementById(arr[count]).scrollTo({ top: 0, behavior: "smooth" });
	}
});

next.addEventListener("click", function () {
	if (count < arr.length - 1) {
		document.getElementById(arr[count]).style.display = "none";
		count += 1;
		render(document.getElementById(arr[count]));
		document.getElementById(arr[count]).scrollTo({ top: 0, behavior: "smooth" });
	} else if (count == arr.length - 1) {
		document.getElementById(arr[count]).style.display = "none";
		count = 0;
		render(document.getElementById(arr[count]));
	}

});

function render(section_) {
	section_.style.display = "flex";
	section_.style.height = "391px";
	section_.style.flexDirection = "column";
	section_.style.overflow = "auto";
	section_.style.borderRadius = "10px";
	function myFunction(x) {
		if (x.matches) { // If media query matches
			section_.style.width = "100%";
		} else {
			section_.style.width = "900px";
		}
	}
	// Create a MediaQueryList object
	var x = window.matchMedia("(max-width: 890px)")

	// Call listener function at run time
	myFunction(x);

	// Attach listener function on state changes
	x.addEventListener("change", function () {
		myFunction(x);
	});
}


//----------------------------------------------------------------------------------------

//---------------------------User details show--------------------------------------------
async function details() {
	try {
		const response = await fetch("https://bms-1-txum.onrender.com/balance", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (response.ok) {
			const data = await response.json();
			//localStorage inside get the account number---------------------------------------------------------------------
			let ac_no = local_storage_ac_no();
			//filter the data array for localStorage account number match to data array inside account number----------------
			let ac_no_values = data.filter((item) => item.account_number == ac_no);
			if (ac_no_values.length == 0) {
				table_body.innerHTML += `
					<tr>
						<td>No Data</td>
						<td>No Data</td>
						<td>No Data</td>
						<td>No Data</td>
						<td>No Data</td>
					</tr>`;
			} else {
				ac_no_values.forEach(element => {
					table_body.innerHTML += `
						<tr>
							<td>${element.dt}</td>
							<td>${element.transaction_method}</td>
							<td>${element.credit}</td>
							<td>${element.debit}</td>
							<td>${element.balance}</td>
						</tr>`;
				})
			}
		} else {
			const err = response.json();
			console.error("error in details api:", err);
		}
	} catch (err) {
		console.error("error in details api:", err);
	}
}
details();
//----------------------------------------------------------------------------------------

//--------------------------finding the login user----------------------------------------------
async function users() {
	try {
		const response = await fetch("https://bms-1-txum.onrender.com/All_User",{
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (response.ok) {
			const data = await response.json();
			//localStorage inside get the account number---------------------------------------------------------------------
			let ac_no = local_storage_ac_no();
			//filter the data array for localStorage account number match to data array inside account number----------------
			let ac_no_values = data.filter((item) => item.account_number == ac_no);
			if (ac_no_values.length == 0) {
				passbook.innerHTML = `<h1>No Data</h1>`;
				one.innerHTML = `<h1>No Data</h1>`;
			} else {
				ac_no_values.forEach(element => {
					passbook.innerHTML = `
					<div>
						<h1 id="passbook_title">Fake Bank</h1>
					</div>
					<hr id="hr"/>
					<div id="passbook_body_info">
						<h2>User Name: ${element.name}</h2>
						<h2>Account Number: ${element.account_number}</h2>
					<div>`;
				});
			}
		} else {
			const err = response.json();
			console.error("error in user getting:", err);
		}
	} catch (err) {
		console.error("error in user getting:", err);
	}
}
users();
//-------------------------------------END-----------------------------------------------------
