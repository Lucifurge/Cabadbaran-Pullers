// ===============================
// CABADBARAN PULLERS
// TIME IN SYSTEM
// ===============================

// CHANGE THIS LATER
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyivO8NTWJ4xjCM3cBcG1lTLAtsM3VpJaPpQSEtXKjUay-COyLYQ0W-zwSiKZymwtqi3Q/exec";

const form = document.getElementById("attendanceForm");
const nameInput = document.getElementById("fullname");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const message = document.getElementById("message");
const submitButton = document.querySelector(".btn-timein");

// ===============================
// LIVE DATE & TIME
// ===============================

function updateDateTime() {

    const now = new Date();

    dateInput.value = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    timeInput.value = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

}

updateDateTime();
setInterval(updateDateTime, 1000);

// ===============================
// AUTO UPPERCASE
// ===============================

nameInput.addEventListener("input", () => {
    nameInput.value = nameInput.value.toUpperCase();
});

// ===============================
// SUBMIT
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullname = nameInput.value.trim();

    if (fullname === "") {

        message.className = "error";
        message.innerHTML = "Please enter your full name.";

        return;

    }

    submitButton.disabled = true;
    submitButton.innerHTML = "Submitting...";

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify({

                fullname: fullname

            })

        });

        const result = await response.json();

        if (result.success) {

            message.className = "success";
            message.innerHTML = "✅ Time In Successful! Welcome " + fullname;

            form.reset();
            updateDateTime();

        } else {

            message.className = "error";
            message.innerHTML = result.message;

        }

    } catch (err) {

        message.className = "error";
        message.innerHTML = "Unable to connect to the server.";

    }

    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Time In';

});
