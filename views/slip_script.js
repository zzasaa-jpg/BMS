import { deposit_, withdrawal_, cheque_ } from "./slip.js";
let deposit_form = document.getElementById("deposit_form");
let withdrawal_slip = document.getElementById("withdrawal_slip");
let cheque_form = document.getElementById("cheque_form");
let form_clear = document.getElementById("form_clear");

form_clear.addEventListener("click", function () {
    if (deposit_) {
        deposit_form.reset();
    }
    if (withdrawal_) {
        withdrawal_slip.reset();
    }
    if (cheque_) {
        cheque_form.reset();
    }
});
