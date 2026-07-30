/*==================================================
    CABADBARAN PULLERS CLUB
    ADMIN PANEL v2.0
    PART 1
==================================================*/

/*==================================================
    CONFIGURATION
==================================================*/

const CONFIG = {

    API_URL: "https://script.google.com/macros/s/AKfycbwC5mN2WDV9cpvpdJPc0yIxpjQomEOASYU_59E7DV1qfCucdujOfEFr-DLVzU6yvSwRrQ/exec"

};

/*==================================================
    GLOBAL VARIABLES
==================================================*/

let members = [];
let filteredMembers = [];
let selectedMember = null;

/*==================================================
    ELEMENTS
==================================================*/

const loadingScreen = document.getElementById("loadingScreen");

const membersBody = document.getElementById("membersBody");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const membershipFilter = document.getElementById("membershipFilter");

const statusFilter = document.getElementById("statusFilter");

const refreshBtn = document.getElementById("refreshBtn");

/*==================================================
    INITIALIZE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeAdmin();

});

function initializeAdmin(){

    loadMembers();

    searchInput?.addEventListener("input", filterMembers);

    membershipFilter?.addEventListener("change", filterMembers);

    statusFilter?.addEventListener("change", filterMembers);

    refreshBtn?.addEventListener("click", loadMembers);

}

/*==================================================
    LOADING
==================================================*/

function showLoading(){

    if(loadingScreen){

        loadingScreen.style.display="flex";

    }

}

function hideLoading(){

    if(loadingScreen){

        loadingScreen.style.display="none";

    }

}

/*==================================================
    FETCH MEMBERS
==================================================*/

async function loadMembers(){

    showLoading();

    try{

        const response = await fetch(CONFIG.API_URL);

        if(!response.ok){

            throw new Error("Unable to contact server.");

        }

        const result = await response.json();

        if(!result.success){

            throw new Error(result.message || "Server returned an error.");

        }

        members = result.data || [];

        filteredMembers = [...members];

        updateDashboard();

        renderTable();

    }

    catch(error){

        console.error(error);

        alert("Unable to load registrations.");

    }

    finally{

        hideLoading();

    }

}

/*==================================================
    DASHBOARD
==================================================*/

function updateDashboard(){

    setCounter("totalMembers", members.length);

    setCounter(
        "standardMembers",
        members.filter(m=>m.membership==="Standard").length
    );

    setCounter(
        "athleteMembers",
        members.filter(m=>m.membership==="Athlete").length
    );

    setCounter(
        "lifetimeMembers",
        members.filter(m=>m.membership==="Lifetime").length
    );

    setCounter(
        "pendingCount",
        members.filter(
            m=>m.applicationStatus==="Pending"
        ).length
    );

    setCounter(
        "approvedCount",
        members.filter(
            m=>m.applicationStatus==="Approved"
        ).length
    );

}

/*==================================================
    SET COUNTER
==================================================*/

function setCounter(id,value){

    const element=document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}

/*==================================================
    REFRESH
==================================================*/

function refreshMembers(){

    loadMembers();

}

/*==================================================
    FORMAT DATE
==================================================*/

function formatDate(date){

    if(!date) return "-";

    try{

        return new Date(date).toLocaleDateString();

    }

    catch{

        return date;

    }

}

/*==================================================
    SAFE VALUE
==================================================*/

function safe(value){

    return value ?? "";

} 
/*==================================================
    TABLE RENDERING
==================================================*/

function renderTable(){

    if(!membersBody) return;

    membersBody.innerHTML = "";

    if(filteredMembers.length === 0){

        if(emptyState){

            emptyState.style.display = "flex";

        }

        return;

    }

    if(emptyState){

        emptyState.style.display = "none";

    }

    let html = "";

    filteredMembers.forEach((member,index)=>{

        const membership = member.membership || "Unknown";

        const payment = member.paymentStatus || "Pending";

        const status = member.applicationStatus || "Pending";

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${member.athleteId || "-"}</td>

            <td>${formatDate(member.dateRegistered)}</td>

            <td>${safe(member.firstName)} ${safe(member.lastName)}</td>

            <td>${safe(member.age)}</td>

            <td>${safe(member.gender)}</td>

            <td>${safe(member.phone)}</td>

            <td>${safe(member.email)}</td>

            <td>

                <span class="badge ${membership.toLowerCase()}">

                    ${membership}

                </span>

            </td>

            <td>

                <span class="badge ${payment.toLowerCase()}">

                    ${payment}

                </span>

            </td>

            <td>

                <span class="badge ${status.toLowerCase()}">

                    ${status}

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

    membersBody.innerHTML = html;

}

/*==================================================
    SEARCH + FILTER
==================================================*/

function filterMembers(){

    const keyword = searchInput.value.trim().toLowerCase();

    const membership = membershipFilter.value;

    const status = statusFilter.value;

    filteredMembers = members.filter(member=>{

        const fullName =

            `${member.firstName || ""} ${member.lastName || ""}`

            .toLowerCase();

        const athleteId =

            (member.athleteId || "").toLowerCase();

        const phone =

            (member.phone || "").toLowerCase();

        const email =

            (member.email || "").toLowerCase();

        const matchesSearch =

            fullName.includes(keyword) ||

            athleteId.includes(keyword) ||

            phone.includes(keyword) ||

            email.includes(keyword);

        const matchesMembership =

            membership === "" ||

            member.membership === membership;

        const matchesStatus =

            status === "" ||

            member.applicationStatus === status;

        return(

            matchesSearch &&

            matchesMembership &&

            matchesStatus

        );

    });

    renderTable();

}

/*==================================================
    CLEAR FILTERS
==================================================*/

function clearFilters(){

    searchInput.value = "";

    membershipFilter.value = "";

    statusFilter.value = "";

    filteredMembers = [...members];

    renderTable();

}

/*==================================================
    GET MEMBER
==================================================*/

function getMember(index){

    return filteredMembers[index];

}
/*==================================================
    MEMBER DETAILS
==================================================*/

function viewMember(index){

    selectedMember = getMember(index);

    if(!selectedMember){

        alert("Member not found.");

        return;

    }

    let info = `

Athlete ID
-------------------------
${selectedMember.athleteId || "-"}

Name
-------------------------
${selectedMember.firstName || ""} ${selectedMember.middleName || ""} ${selectedMember.lastName || ""}

Birthday
-------------------------
${selectedMember.birthday || "-"}

Age
-------------------------
${selectedMember.age || "-"}

Gender
-------------------------
${selectedMember.gender || "-"}

Email
-------------------------
${selectedMember.email || "-"}

Phone
-------------------------
${selectedMember.phone || "-"}

Facebook
-------------------------
${selectedMember.facebook || "-"}

Address
-------------------------
${selectedMember.address || "-"}

Membership
-------------------------
${selectedMember.membership || "-"}

Payment
-------------------------
${selectedMember.paymentStatus || "-"}

Application
-------------------------
${selectedMember.applicationStatus || "-"}

Club
-------------------------
${selectedMember.club || "-"}

Weight Class
-------------------------
${selectedMember.weightClass || "-"}

Height
-------------------------
${selectedMember.height || "-"}

Weight
-------------------------
${selectedMember.weight || "-"}

`;

    alert(info);

}

/*==================================================
    APPROVE MEMBER
==================================================*/

function approveMember(index){

    const member = getMember(index);

    if(!member) return;

    const confirmApprove = confirm(

        `Approve ${member.firstName} ${member.lastName}?`

    );

    if(!confirmApprove) return;

    member.applicationStatus = "Approved";

    renderTable();

    updateDashboard();

    alert("Member approved.\n\n(Backend will be connected later)");

}

/*==================================================
    REJECT MEMBER
==================================================*/

function rejectMember(index){

    const member = getMember(index);

    if(!member) return;

    const confirmReject = confirm(

        `Reject ${member.firstName} ${member.lastName}?`

    );

    if(!confirmReject) return;

    member.applicationStatus = "Rejected";

    renderTable();

    updateDashboard();

    alert("Member rejected.\n\n(Backend will be connected later)");

}

/*==================================================
    DELETE MEMBER
==================================================*/

function deleteMember(index){

    const member = getMember(index);

    if(!member) return;

    const confirmDelete = confirm(

`DELETE THIS MEMBER?

${member.firstName} ${member.lastName}

This cannot be undone.`);

    if(!confirmDelete) return;

    members = members.filter(

        m => m !== member

    );

    filteredMembers = filteredMembers.filter(

        m => m !== member

    );

    renderTable();

    updateDashboard();

    alert("Member removed locally.\n\n(Backend will be connected later)");

}

/*==================================================
    EXPORT CSV
==================================================*/

function exportCSV(){

    if(members.length===0){

        alert("No members found.");

        return;

    }

    let csv = "";

    csv += "Athlete ID,";

    csv += "First Name,";

    csv += "Last Name,";

    csv += "Gender,";

    csv += "Age,";

    csv += "Phone,";

    csv += "Email,";

    csv += "Membership,";

    csv += "Payment,";

    csv += "Application\n";

    members.forEach(member=>{

        csv += `"${member.athleteId}",`;

        csv += `"${member.firstName}",`;

        csv += `"${member.lastName}",`;

        csv += `"${member.gender}",`;

        csv += `"${member.age}",`;

        csv += `"${member.phone}",`;

        csv += `"${member.email}",`;

        csv += `"${member.membership}",`;

        csv += `"${member.paymentStatus}",`;

        csv += `"${member.applicationStatus}"\n`;

    });

    const blob = new Blob(

        [csv],

        {type:"text/csv"}

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Cabadbaran_Pullers_Members.csv";

    a.click();

    URL.revokeObjectURL(url);

}

/*==================================================
    PRINT MEMBER
==================================================*/

function printMember(index){

    const member = getMember(index);

    if(!member) return;

    window.print();

}

/*==================================================
    DEBUG
==================================================*/

console.log(

"%cCabadbaran Pullers Admin Panel Ready",

"color:#D4AF37;font-size:15px;font-weight:bold;"

);

/*==================================================
    MEMBER MODAL
==================================================*/

const memberModal = document.getElementById("memberModal");

const modalContent = document.getElementById("memberModalContent");

const closeMemberModal = document.getElementById("closeMemberModal");

/*==================================================
    OPEN MODAL
==================================================*/

function openMemberModal(){

    if(memberModal){

        memberModal.classList.add("active");

        document.body.style.overflow="hidden";

    }

}

/*==================================================
    CLOSE MODAL
==================================================*/

function closeModal(){

    if(memberModal){

        memberModal.classList.remove("active");

        document.body.style.overflow="auto";

    }

}

if(closeMemberModal){

    closeMemberModal.addEventListener("click",closeModal);

}

window.addEventListener("click",(e)=>{

    if(e.target===memberModal){

        closeModal();

    }

});

/*==================================================
    VIEW MEMBER
==================================================*/

function viewMember(index){

    selectedMember=getMember(index);

    if(!selectedMember) return;

    modalContent.innerHTML=`

<div class="member-profile">

    <div class="profile-header">

        <div class="profile-avatar">

            <i class="fas fa-user"></i>

        </div>

        <div>

            <h2>

                ${selectedMember.firstName || ""}

                ${selectedMember.lastName || ""}

            </h2>

            <p>

                Athlete ID :
                ${selectedMember.athleteId || "-"}

            </p>

        </div>

    </div>

    <div class="profile-grid">

        <div>

            <h3>Personal Information</h3>

            <p><strong>Birthday:</strong> ${selectedMember.birthday || "-"}</p>

            <p><strong>Age:</strong> ${selectedMember.age || "-"}</p>

            <p><strong>Gender:</strong> ${selectedMember.gender || "-"}</p>

            <p><strong>Email:</strong> ${selectedMember.email || "-"}</p>

            <p><strong>Phone:</strong> ${selectedMember.phone || "-"}</p>

            <p><strong>Facebook:</strong> ${selectedMember.facebook || "-"}</p>

            <p><strong>Address:</strong> ${selectedMember.address || "-"}</p>

        </div>

        <div>

            <h3>Arm Wrestling</h3>

            <p><strong>Club:</strong> ${selectedMember.club || "-"}</p>

            <p><strong>Weight:</strong> ${selectedMember.weight || "-"} kg</p>

            <p><strong>Height:</strong> ${selectedMember.height || "-"} cm</p>

            <p><strong>Weight Class:</strong> ${selectedMember.weightClass || "-"}</p>

            <p><strong>Experience:</strong> ${selectedMember.experience || "-"}</p>

            <p><strong>Dominant Hand:</strong> ${selectedMember.dominantHand || "-"}</p>

            <p><strong>Competition Arm:</strong> ${selectedMember.competitionArm || "-"}</p>

        </div>

        <div>

            <h3>Membership</h3>

            <p><strong>Membership:</strong> ${selectedMember.membership || "-"}</p>

            <p><strong>Payment:</strong> ${selectedMember.paymentStatus || "-"}</p>

            <p><strong>Status:</strong> ${selectedMember.applicationStatus || "-"}</p>

            <p><strong>Registered:</strong> ${selectedMember.dateRegistered || "-"}</p>

        </div>

        <div>

            <h3>Emergency Contact</h3>

            <p><strong>Name:</strong> ${selectedMember.emergencyName || "-"}</p>

            <p><strong>Relationship:</strong> ${selectedMember.relationship || "-"}</p>

            <p><strong>Phone:</strong> ${selectedMember.emergencyPhone || "-"}</p>

            <p><strong>Blood Type:</strong> ${selectedMember.bloodType || "-"}</p>

            <p><strong>Address:</strong> ${selectedMember.emergencyAddress || "-"}</p>

        </div>

    </div>

</div>

`;

    openMemberModal();

}
/*==================================================
    PREMIUM FEATURES
==================================================*/

/*==================================================
    LIVE CLOCK
==================================================*/

const liveClock = document.getElementById("liveClock");

function updateClock(){

    if(!liveClock) return;

    const now = new Date();

    liveClock.textContent = now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

/*==================================================
    TABLE SORTING
==================================================*/

let sortAscending = true;

function sortMembers(field){

    filteredMembers.sort((a,b)=>{

        let valueA = a[field] || "";

        let valueB = b[field] || "";

        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();

        if(valueA < valueB){

            return sortAscending ? -1 : 1;

        }

        if(valueA > valueB){

            return sortAscending ? 1 : -1;

        }

        return 0;

    });

    sortAscending = !sortAscending;

    renderTable();

}

/*==================================================
    REFRESH ANIMATION
==================================================*/

async function refreshMembers(){

    refreshBtn.classList.add("spin");

    await loadMembers();

    setTimeout(()=>{

        refreshBtn.classList.remove("spin");

    },600);

}

/*==================================================
    SEARCH HIGHLIGHT
==================================================*/

function highlight(text){

    const keyword = searchInput.value.trim();

    if(!keyword) return text;

    const regex = new RegExp(`(${keyword})`,"gi");

    return String(text).replace(

        regex,

        `<mark>$1</mark>`

    );

}

/*==================================================
    MEMBER COUNTER
==================================================*/

function updateMemberCounter(){

    const counter=document.getElementById("memberCounter");

    if(counter){

        counter.textContent=

            `${filteredMembers.length} Member(s)`;

    }

}

/*==================================================
    CALL AFTER TABLE
==================================================*/

const oldRenderTable = renderTable;

renderTable = function(){

    oldRenderTable();

    updateMemberCounter();

};

/*==================================================
    COPY ATHLETE ID
==================================================*/

function copyAthleteID(index){

    const member=getMember(index);

    if(!member) return;

    navigator.clipboard.writeText(

        member.athleteId

    );

    alert("Athlete ID copied!");

}

/*==================================================
    PRINT PROFILE
==================================================*/

function printProfile(){

    window.print();

}

/*==================================================
    DOWNLOAD JSON
==================================================*/

function exportJSON(){

    const blob = new Blob(

        [

            JSON.stringify(

                filteredMembers,

                null,

                4

            )

        ],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="members.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*==================================================
    FULLSCREEN
==================================================*/

function toggleFullscreen(){

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }

    else{

        document.exitFullscreen();

    }

}

/*==================================================
    AUTO REFRESH
==================================================*/

setInterval(()=>{

    loadMembers();

},60000);

/*==================================================
    KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="r"){

        e.preventDefault();

        refreshMembers();

    }

    if(e.ctrlKey && e.key==="f"){

        e.preventDefault();

        searchInput.focus();

    }

});

/*==================================================
    READY
==================================================*/

console.log(

"%cAdmin Panel Premium Loaded",

"color:#D4AF37;font-size:16px;font-weight:bold;"

);
/*==================================================
    CABADBARAN PULLERS
    ADMIN PANEL
    PART 6
==================================================*/

/*==================================================
    PAGINATION
==================================================*/

const ROWS_PER_PAGE = 15;

let currentPage = 1;

function totalPages(){

    return Math.max(

        1,

        Math.ceil(filteredMembers.length / ROWS_PER_PAGE)

    );

}

function paginatedMembers(){

    const start = (currentPage-1) * ROWS_PER_PAGE;

    const end = start + ROWS_PER_PAGE;

    return filteredMembers.slice(start,end);

}

/*==================================================
    NEXT PAGE
==================================================*/

function nextPage(){

    if(currentPage < totalPages()){

        currentPage++;

        renderTable();

    }

}

/*==================================================
    PREVIOUS PAGE
==================================================*/

function previousPage(){

    if(currentPage > 1){

        currentPage--;

        renderTable();

    }

}

/*==================================================
    PAGE NUMBER
==================================================*/

function updatePagination(){

    const page=document.getElementById("pageNumber");

    if(page){

        page.textContent=

            `${currentPage} / ${totalPages()}`;

    }

}

/*==================================================
    OVERRIDE TABLE
==================================================*/

const originalRenderTable = renderTable;

renderTable = function(){

    if(!membersBody) return;

    membersBody.innerHTML="";

    if(filteredMembers.length===0){

        emptyState.style.display="flex";

        updatePagination();

        return;

    }

    emptyState.style.display="none";

    let html="";

    paginatedMembers().forEach((member,index)=>{

        html+=`

<tr>

<td>${((currentPage-1)*ROWS_PER_PAGE)+index+1}</td>

<td>${member.athleteId || "-"}</td>

<td>${formatDate(member.dateRegistered)}</td>

<td>${safe(member.firstName)} ${safe(member.lastName)}</td>

<td>${safe(member.age)}</td>

<td>${safe(member.gender)}</td>

<td>${safe(member.phone)}</td>

<td>${safe(member.email)}</td>

<td>

<span class="badge ${(member.membership||"").toLowerCase()}">

${member.membership}

</span>

</td>

<td>

<span class="badge ${(member.paymentStatus||"").toLowerCase()}">

${member.paymentStatus}

</span>

</td>

<td>

<span class="badge ${(member.applicationStatus||"").toLowerCase()}">

${member.applicationStatus}

</span>

</td>

<td>

<div class="action-buttons">

<button
class="action-btn view"
onclick="viewMember(${((currentPage-1)*ROWS_PER_PAGE)+index})">

<i class="fas fa-eye"></i>

</button>

<button
class="action-btn approve"
onclick="approveMember(${((currentPage-1)*ROWS_PER_PAGE)+index})">

<i class="fas fa-check"></i>

</button>

<button
class="action-btn reject"
onclick="rejectMember(${((currentPage-1)*ROWS_PER_PAGE)+index})">

<i class="fas fa-ban"></i>

</button>

<button
class="action-btn delete"
onclick="deleteMember(${((currentPage-1)*ROWS_PER_PAGE)+index})">

<i class="fas fa-trash"></i>

</button>

</div>

</td>

</tr>

`;

    });

    membersBody.innerHTML=html;

    updatePagination();

    updateMemberCounter();

};

/*==================================================
    REGISTRATION CHART
==================================================*/

function updateRegistrationChart(){

    const canvas=document.getElementById("registrationChart");

    if(!canvas) return;

    const ctx=canvas.getContext("2d");

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    const stats={

        Standard:0,

        Athlete:0,

        Lifetime:0

    };

    members.forEach(member=>{

        if(stats[member.membership]!=undefined){

            stats[member.membership]++;

        }

    });

    const values=Object.values(stats);

    const max=Math.max(...values,1);

    const labels=Object.keys(stats);

    const width=80;

    const gap=40;

    values.forEach((value,index)=>{

        const height=(value/max)*180;

        const x=(index*(width+gap))+40;

        const y=220-height;

        ctx.fillStyle="#D4AF37";

        ctx.fillRect(

            x,

            y,

            width,

            height

        );

        ctx.fillStyle="#ffffff";

        ctx.fillText(

            labels[index],

            x,

            245

        );

        ctx.fillText(

            value,

            x+30,

            y-10

        );

    });

}

/*==================================================
    MEMBER SUMMARY
==================================================*/

function generateSummary(){

    console.table(members);

    console.log(

        "Total:",

        members.length

    );

}

/*==================================================
    REFRESH EVERYTHING
==================================================*/

async function refreshDashboard(){

    await loadMembers();

    updateRegistrationChart();

}

/*==================================================
    WINDOW RESIZE
==================================================*/

window.addEventListener(

"resize",

()=>{

    updateRegistrationChart();

});

/*==================================================
    INITIALIZE
==================================================*/

setTimeout(()=>{

    updateRegistrationChart();

},1000);

/*==================================================
    READY
==================================================*/

console.log(

"%cAdmin Panel Enterprise Ready",

"color:#00ff99;font-size:16px;font-weight:bold;"

);
