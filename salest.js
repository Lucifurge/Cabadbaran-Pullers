/*==================================================
 CABADBARAN PULLERS
 TOURNAMENT MANAGEMENT SYSTEM
==================================================*/


const TOURNAMENT_API =
"https://script.google.com/macros/s/AKfycbwEwdK7ZGi8liWdfgz9cKM2s5nrfo4kroi8hyyxWIzsdtgzgvf2nE8oHGj7lVmFR978Gg/exec";



let tournamentRecords = [];






/*==================================================
 START SYSTEM
==================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


loadTournament();



const form =
document.getElementById(
"tournamentForm"
);



if(form){

form.addEventListener(
"submit",
addTournament
);

}


});







/*==================================================
 LOAD TOURNAMENT RECORDS
==================================================*/


async function loadTournament(){


try{


const response =
await fetch(
TOURNAMENT_API +
"?action=tournament&t=" +
Date.now()
);



const result =
await response.json();



console.log(
"TOURNAMENT:",
result
);



if(result.success){


tournamentRecords =
result.data || [];



displayTournament();


updateDashboard();



}


}

catch(error){


console.error(
"LOAD TOURNAMENT ERROR:",
error
);


alert(
"Unable to load tournament records"
);


}



}









/*==================================================
 ADD TOURNAMENT RECORD
==================================================*/


async function addTournament(e){


e.preventDefault();




const revenue =
Number(
document.getElementById("revenue").value
) || 0;



const expense =
Number(
document.getElementById("expense").value
) || 0;






const data = {


action:
"addTournament",



tournament:
document.getElementById("tournament").value,



category:
document.getElementById("category").value,



description:
document.getElementById("description").value,



quantity:
Number(
document.getElementById("quantity").value
) || 0,



revenue:
revenue,



expense:
expense,



paymentStatus:
document.getElementById("paymentStatus").value,



addedBy:
document.getElementById("addedBy").value,



notes:
document.getElementById("notes").value



};







try{


const response =
await fetch(
TOURNAMENT_API,
{


method:"POST",


headers:{


"Content-Type":
"text/plain;charset=utf-8"


},


body:
JSON.stringify(data)



}

);






const result =
await response.json();



console.log(
"ADD RESULT:",
result
);





if(result.success){


alert(
"Tournament Record Added"
);



document
.getElementById(
"tournamentForm"
)
.reset();



loadTournament();



}

else{


alert(
result.message
);


}



}



catch(error){


console.error(
"ADD TOURNAMENT ERROR:",
error
);



alert(
"Failed to save tournament record"
);



}



}









/*==================================================
 DISPLAY TABLE
==================================================*/


function displayTournament(){


const table =
document.getElementById(
"tournamentTable"
);



if(!table)
return;



table.innerHTML="";





tournamentRecords.forEach(
(record)=>{


table.innerHTML += `


<tr>


<td>
${record.Date || ""}
</td>


<td>
${record.Tournament || ""}
</td>


<td>
${record.Category || ""}
</td>


<td>
${record.Description || ""}
</td>


<td>
${record.Quantity || 0}
</td>


<td>
₱${Number(
record.Revenue || 0
).toLocaleString()}
</td>


<td>
₱${Number(
record.Expense || 0
).toLocaleString()}
</td>


<td>
₱${Number(
record.Profit || 0
).toLocaleString()}
</td>


<td>
${record.PaymentStatus || ""}
</td>


<td>
${record.AddedBy || ""}
</td>


<td>
${record.Notes || ""}
</td>


</tr>


`;


});


}









/*==================================================
 DASHBOARD
==================================================*/


function updateDashboard(){


let totalRevenue = 0;

let totalExpense = 0;

let totalProfit = 0;

let totalPlayers = 0;





tournamentRecords.forEach(
(record)=>{


totalRevenue +=
Number(
record.Revenue
) || 0;



totalExpense +=
Number(
record.Expense
) || 0;



totalProfit +=
Number(
record.Profit
) || 0;



if(
record.Category === "Registration"
){


totalPlayers +=
Number(
record.Quantity
) || 0;


}



});







const revenue =
document.getElementById(
"totalRevenue"
);



const expense =
document.getElementById(
"totalExpense"
);



const profit =
document.getElementById(
"totalProfit"
);



const players =
document.getElementById(
"totalPlayers"
);







if(revenue)

revenue.innerHTML =
"₱" +
totalRevenue.toLocaleString();





if(expense)

expense.innerHTML =
"₱" +
totalExpense.toLocaleString();





if(profit)

profit.innerHTML =
"₱" +
totalProfit.toLocaleString();





if(players)

players.innerHTML =
totalPlayers;



}
