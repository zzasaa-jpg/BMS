let label_for_account_number = document.getElementById("label_for_account_number");
let label_for_password = document.getElementById("label_for_password");
let form = document.getElementById("form");
let side_menu_div = document.getElementById("side_menu_div");
let porfile = document.getElementById("profile");
let user_info = document.getElementById("user_info");
let form_clear = document.getElementById("form_clear");

let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    all_label()
});

form_clear.addEventListener("click", function () {
    form.reset();
});

porfile.addEventListener("click", function () {
    user_info.style.transform = "translateY(0px)";
});

label_for_account_number.addEventListener("click", function () {
    label_for_account_number.style.transform = "translateY(-35px)";
});

label_for_password.addEventListener("click", function () {
    label_for_password.style.transform = "translateY(-35px)";
});

form.addEventListener("keydown", function () {
    if (event.key === "Enter" || event.key === "ArrowDown" || event.key === "ArrowUp") {
        all_label()
    }
});

form.addEventListener("input", function () {
    all_label()
});

function myFunction(x) {
    if (x.matches) { // If media query matches
        let side_menu_div_value = false;
        window.addEventListener("dblclick", function () {
            side_menu_div_value = !side_menu_div_value;
            if (side_menu_div_value) {
                setTimeout(() => {
                    side_menu_div.style.transform = "translateX(5px)";
                }, 100)
                side_menu_div.style.transition = "all 500ms";
            } else {
                side_menu_div.style.transform = "translateX(-300px)";
                side_menu_div.style.transition = "all 500ms";
            }

        });


    } else {
        let side_menu_div_value = false;
        window.addEventListener("dblclick", function () {
            side_menu_div_value = !side_menu_div_value;
            if (side_menu_div_value) {
                setTimeout(() => {
                    side_menu_div.style.transform = "translateY(0)";
                }, 100)
                side_menu_div.style.transition = "all 500ms";
            } else {
                side_menu_div.style.transform = "translateY(100px)";
                side_menu_div.style.transition = "all 500ms";
            }

        });
    }
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 768px)")

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
    myFunction(x);
});

function all_label() {
    label_for_account_number.style.transform = "translateY(-35px)";
    label_for_password.style.transform = "translateY(-35px)";
}