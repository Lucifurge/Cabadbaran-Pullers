/*==================================================
    CABADBARAN PULLERS
    ADMIN PANEL
==================================================*/

//==================================================
// CONFIGURATION
//==================================================

const API_URL = "https://script.google.com/macros/s/AKfycbwC5mN2WDV9cpvpdJPc0yIxpjQomEOASYU_59E7DV1qfCucdujOfEFr-DLVzU6yvSwRrQ/exec";

//==================================================
// GLOBAL VARIABLES
//==================================================

let members = [];
let filteredMembers = [];
let selectedMember = null;

//==================================================
// ELEMENTS
//==================================================

const loadingScreen = document.getElementById("loadingScreen");

const membersBody = document.getElementById("membersBody");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const membershipFilter = document.getElementById("membershipFilter");

const statusFilter = document.getElementById("statusFilter");

const refreshBtn = document.getElementById("refreshBtn");

//==================================================
// INITIALIZE
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    loadMembers();

    searchInput.addEventListener("input", filterMembers);

    membershipFilter.addEventListener("change", filterMembers);

    statusFilter.addEventListener("change", filterMembers);

    refreshBtn.addEventListener("click", loadMembers);

});

//==================================================
// SHOW / HIDE LOADING
//==================================================

function showLoading(){

    loadingScreen.style.display = "flex";

}

function hideLoading(){

    loadingScreen.style.display = "none";

}

//==================================================
// LOAD MEMBERS
//==================================================

async function loadMembers(){

    showLoading();

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        members = data;

        filteredMembers = [...members];

        updateDashboard();

        renderTable();

    }

    catch(error){

        console.error(error);

        alert("Unable to load registrations.");

    }

    hideLoading();

}

//==================================================
// DASHBOARD
//==================================================

function updateDashboard(){

    document.getElementById("totalMembers").textContent =
        members.length;

    document.getElementById("standardMembers").textContent =
        members.filter(m=>m.membership==="Standard").length;

    document.getElementById("athleteMembers").textContent =
        members.filter(m=>m.membership==="Athlete").length;

    document.getElementById("lifetimeMembers").textContent =
        members.filter(m=>m.membership==="Lifetime").length;

    document.getElementById("pendingCount").textContent =
        members.filter(m=>m.status==="Pending").length;

    document.getElementById("approvedCount").textContent =
        members.filter(m=>m.status==="Approved").length;

}

//==================================================
// TABLE
//==================================================

function renderTable(){

    membersBody.innerHTML = "";

    if(filteredMembers.length===0){

        emptyState.style.display="flex";

        return;

    }

    emptyState.style.display="none";

    filteredMembers.forEach((member,index)=>{

        membersBody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${member.date || "-"}</td>

            <td>${member.firstName} ${member.lastName}</td>

            <td>${member.age}</td>

            <td>${member.gender}</td>

            <td>${member.phone}</td>

            <td>${member.email}</td>

            <td>

                <span class="badge ${member.membership.toLowerCase()}">

                    ${member.membership}

                </span>

            </td>

            <td>${member.paymentStatus}</td>

            <td>

                <span class="badge ${member.status.toLowerCase()}">

                    ${member.status}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn view"
                        onclick="viewMember(${index})">

                        <i class="fas fa-eye"></i>

                    </button>

                    <button
                        class="action-btn approve"
                        onclick="approveMember(${index})">

                        <i class="fas fa-check"></i>

                    </button>

                    <button
                        class="action-btn reject"
                        onclick="rejectMember(${index})">

                        <i class="fas fa-ban"></i>

                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteMember(${index})">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}
