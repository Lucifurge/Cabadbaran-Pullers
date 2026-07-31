// ==========================================
// CABADBARAN PULLERS
// ADMIN DASHBOARD
// ==========================================

const attendanceBody = document.getElementById("attendanceBody");

const totalMembers = document.getElementById("totalMembers");
const pendingMembers = document.getElementById("pendingMembers");
const checkedMembers = document.getElementById("checkedMembers");

const refreshBtn = document.getElementById("refreshBtn");

// ==========================================
// LOAD ATTENDANCE
// ==========================================

function loadAttendance() {

    google.script.run
        .withSuccessHandler(showAttendance)
        .getAttendance();

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
            ? `
                <button
                    class="action-btn btn-check"
                    onclick="markChecked(${record.row})">

                    Check

                </button>
            `
            : `
                <button
                    class="action-btn btn-pending"
                    onclick="markPending(${record.row})">

                    Pending

                </button>
            `;

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

function markChecked(row) {

    google.script.run
        .withSuccessHandler(loadAttendance)
        .markChecked(row);

}

// ==========================================
// MARK PENDING
// ==========================================

function markPending(row) {

    google.script.run
        .withSuccessHandler(loadAttendance)
        .markPending(row);

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
