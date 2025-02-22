let label_for_name = document.getElementById("label_for_name");
let label_for_mail = document.getElementById("label_for_mail");
let label_for_aadhar_number = document.getElementById("label_for_aadhar_number");
let label_for_phone_number = document.getElementById("label_for_phone_number");
let form = document.getElementById("form");
let form_clear = document.getElementById("form_clear");
let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    all_label();
});

form_clear.addEventListener("click", function () {
    form.reset();
});

label_for_name.addEventListener("click", function () {
    label_for_name.style.transform = "translateY(-35px)";
});

label_for_mail.addEventListener("click", function () {
    label_for_mail.style.transform = "translateY(-35px)";
});

label_for_aadhar_number.addEventListener("click", function () {
    label_for_aadhar_number.style.transform = "translateY(-35px)";
});

label_for_phone_number.addEventListener("click", function () {
    label_for_phone_number.style.transform = "translateY(-35px)";
});

form.addEventListener("keydown", function () {
    if (event.key === "Enter" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        all_label();
    }
});

form.addEventListener("input", function () {
    all_label();
});

function myFunction(x) {
    if (x.matches) { // If media query matches
        [label_for_name, label_for_mail, label_for_aadhar_number, label_for_phone_number].forEach(element => {
            element.style.width = "-webkit-fill-available";
            element.style.left = "10px";
        });
    } else {
        [label_for_name, label_for_mail, label_for_aadhar_number, label_for_phone_number].forEach(element => {
            element.style.width = "35%";
            element.style.left = "160px";
        });
    }
}

var x = window.matchMedia("(max-width: 768px)")

myFunction(x);

x.addEventListener("change", function () {
    myFunction(x);
});

function all_label() {
    label_for_name.style.transform = "translateY(-35px)";
    label_for_mail.style.transform = "translateY(-35px)";
    label_for_aadhar_number.style.transform = "translateY(-35px)";
    label_for_phone_number.style.transform = "translateY(-35px)";
}