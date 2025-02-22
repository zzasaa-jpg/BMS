//------creating elements-----------
let notification_body_div = document.createElement("div");
let time_status_div = document.createElement("div");
let info_body_div = document.createElement("div");
let info_h2 = document.createElement("h3");
//------class adding on elements---------
notification_body_div.classList.add("notification_body");
time_status_div.classList.add("time_status");
info_body_div.classList.add("info_body");
info_h2.classList.add("info");

// -----each element styles----------
// notification_body_div.style.width = "250px";
notification_body_div.style.position = "absolute";
notification_body_div.style.left = "5px";
notification_body_div.style.top = "10px";
notification_body_div.style.transform = "translateX(-1000vw)";
notification_body_div.style.transition = "All 0.5s ease-in-out";
notification_body_div.style.display = "flex";
notification_body_div.style.flexDirection = "column";
notification_body_div.style.gap = "19px";
notification_body_div.style.fontFamily = "Arial, Helvetica, sans-serif";
notification_body_div.style.boxShadow = "2px 2px 5px";
notification_body_div.style.height = "70px";
notification_body_div.style.zIndex = "3";
//------------------------------------------------
time_status_div.style.width = "0px";
time_status_div.style.backgroundColor = "rgba(0, 0, 0, 0.461)";
time_status_div.style.height = "5px";
//------------------------------------------------
info_body_div.style.textAlign = "center";

let time_status = document.querySelector(".time_status");
let notification_body = document.querySelector(".notification_body");
let time_of_notification_value = false;
let info = document.getElementById("info");

function time_of_notification(width_value) {
    setTimeout(() => {
        time_status_div.style.width = width_value;
        time_status_div.style.transition = "All 3s ease-in-out";
    }, 500);
}

export function Notification(info_value, backgroundColor_value, color_value) {
    info_h2.innerText = info_value;
    notification_body_div.style.backgroundColor = backgroundColor_value;
    info_h2.style.color = color_value;
    notification_body_div.style.transform = "translateX(0px)";
    if (time_of_notification_value) {
        time_of_notification("100%")
    } else {
        time_of_notification("250px")
    }
    setTimeout(() => {
        notification_body_div.style.transform = "translateX(-1000vw)";
        time_status_div.style.width = "0px";
        time_status_div.style.transition = "none";
    }, 3500);
};

function myFunction(x) {
    if (x.matches) { // If media query matches
        time_of_notification_value = !time_of_notification_value;
        notification_body_div.style.width = "97.5%";
    } else {
        time_of_notification_value = false;
        notification_body_div.style.width = "250px";
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

notification_body_div.append(time_status_div, info_body_div);
info_body_div.append(info_h2);
document.body.append(notification_body_div);