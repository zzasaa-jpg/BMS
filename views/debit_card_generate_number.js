//-------------generating the card number------------------------------------
export function debit_card_generate(section1, section2, section3, section4) {
	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	let generated_array_1 = [];
	let generated_array_2 = [];
	let generated_array_3 = [];
	let generated_array_4 = [];

	generate_number(generated_array_1);
	generate_number(generated_array_2);
	generate_number(generated_array_3);
	generate_number(generated_array_4);

	function generate_number(arr) {
		for (let i = 0; i < 4; i++) {
			arr.push(array[Math.floor(Math.random() * 10)]);
		}
	}

	section1.innerText = generated_array_1.join("");
	section2.innerText = generated_array_2.join("");
	section3.innerText = generated_array_3.join("");
	section4.innerText = generated_array_4.join("");
}
//--------------------END----------------------------------------------------
