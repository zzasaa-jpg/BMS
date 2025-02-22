export function input_phone_value_slice(name_of_input) {
	name_of_input.addEventListener("input", function () {
		if (this.value.length > 10) {
			this.value = this.value.slice(0, 10);
		}
	});
}