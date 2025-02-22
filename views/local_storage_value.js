//----exporting the local storage values--------------
export function local_storage_ac_no() {
	let ac_no__ = localStorage.getItem("obj");
	let ac_no_parse = JSON.parse(ac_no__);
	let ac_no = ac_no_parse.ac_no_;
	return ac_no;
}

export function local_storage_id() {
	let id__ = localStorage.getItem("obj");
	let id_parse = JSON.parse(id__);
	let id = id_parse.id;
	return id;
}

export function local_storage_pin_() {
	let pin__ = localStorage.getItem("PIN");
	let pin_parse = JSON.parse(pin__);
	let pin = pin_parse.pin;
	return pin;
}

export function local_storage_pin_value() {
	let pin_value_ = localStorage.getItem("PIN");
	let pin_value_parse = JSON.parse(pin_value_);
	let pin_value = pin_value_parse.pin_value;
	return pin_value;
}
//---------------END----------------------------------
