export function input_value_slice(name_of_input) {
	name_of_input.addEventListener("input", function () {
		if (this.value.length > 12) {
			this.value = this.value.slice(0, 12);
		}
	});
}