// ==========================================
// CABADBARAN PULLERS
// ADMIN DASHBOARD
// ==========================================

// CHANGE THIS
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3J1dEmkq4Qwwut65j06beWb6qsKXUOz9zWHCuVcQddH-VLrGkhOMt0kythCeOb7GbAw/exec";

const attendanceBody = document.getElementById("attendanceBody");

const totalMembers = document.getElementById("totalMembers");
const pendingMembers = document.getElementById("pendingMembers");
const checkedMembers = document.getElementById("checkedMembers");

const refreshBtn = document.getElementById("refreshBtn");

// ==========================================
// LOAD ATTENDANCE
// ==========================================

async function loadAttendance() {

    try {

        const response = await fetch(
            SCRIPT_URL + "?action=attendance"
        );

        const data = await response.json();

        showAttendance(data);

    } catch (err) {

        console.error(err);

        attendanceBody.innerHTML = `
            <tr>
                <td colspan="5" class="loading">
                    Unable to load attendance.
                </td>
            </tr>
        `;

    }

}

// ==========================================
// DISPLAY TABLE
// ==========================================

function showAttendance(data) {

    totalMembers.textContent = data.total;
    pendingMembers.textContent = data.pending;
    checkedMembers.textContent = data.checked;

    attendanceBody.innerHTML = "";

    if (data.records.length === 0) {

        attendanceBody.innerHTML = `
            <tr>
                <td colspan="5" class="loading">
                    No attendance today.
                </td>
            </tr>
        `;

        return;

    }

    data.records.forEach(record => {

        const statusClass =
            record.status === "Checked"
                ? "checked-status"
                : "pending-status";

        const actionButton =
            record.status === "Pending"
                ? `<button class="action-btn btn-check"
                    onclick="markChecked(${record.row})">
                    Check
                </button>`
                : `<button class="action-btn btn-pending"
                    onclick="markPending(${record.row})">
                    Pending
                </button>`;

        attendanceBody.innerHTML += `

        <tr>

            <td>${record.name}</td>

            <td>${record.date}</td>

            <td>${record.time}</td>

            <td>
                <span class="status ${statusClass}">
                    ${record.status}
                </span>
            </td>

            <td>
                ${actionButton}
            </td>

        </tr>

        `;

    });

}

// ==========================================
// MARK CHECKED
// ==========================================

async function markChecked(row) {

    await fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "checked",

            row: row

        })

    });

    loadAttendance();

}

// ==========================================
// MARK PENDING
// ==========================================

async function markPending(row) {

    await fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "pending",

            row: row

        })

    });

    loadAttendance();

}

// ==========================================
// REFRESH BUTTON
// ==========================================

refreshBtn.addEventListener("click", loadAttendance);

// ==========================================
// AUTO REFRESH
// ==========================================

loadAttendance();

setInterval(loadAttendance, 10000);
