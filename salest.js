/*==================================================
 CABADBARAN PULLERS
 TOURNAMENT MANAGEMENT SYSTEM
==================================================*/


const TOURNAMENT_API =
"https://script.google.com/macros/s/AKfycbzaQru57WFYQC0Ne2HzzGBva3XNzH5CIR7u8s_F9F8mkByt6nkVDsLj3JwZJspRyZG54A/exec";



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
 LOAD RECORDS
==================================================*/


async function loadTournament(){


try{


const response =
await fetch(
TOURNAMENT_API+
"?action=tournament&t="+Date.now()
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
 ADD RECORD
==================================================*/


async function addTournament(e){


e.preventDefault();





const revenue =
Number(
document.getElementById(
"revenue"
).value
)||0;




const expense =
Number(
document.getElementById(
"expense"
).value
)||0;





const data = {


action:
"addTournamentSale",



tournament:
document.getElementById(
"tournament"
).value,



category:
document.getElementById(
"category"
).value,



description:
document.getElementById(
"description"
).value,



quantity:
Number(
document.getElementById(
"quantity"
).value
)||0,



revenue:
revenue,



expense:
expense,



paymentStatus:
document.getElementById(
"paymentStatus"
).value,



addedBy:
document.getElementById(
"addedBy"
).value,



notes:
document.getElementById(
"notes"
).value



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



}



catch(error){


console.error(
"ADD ERROR:",
error
);



alert(
"Failed to save record"
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
record=>{



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



</tr>


`;



});



}












/*==================================================
 DASHBOARD
==================================================*/


function updateDashboard(){


let revenue = 0;

let expense = 0;

let profit = 0;

let players = 0;





tournamentRecords.forEach(
record=>{



revenue +=
Number(
record.Revenue
)||0;



expense +=
Number(
record.Expense
)||0;



profit +=
Number(
record.Profit
)||0;



if(
record.Category === "Registration"
){

players +=
Number(
record.Quantity
)||0;


}



});









const revenueBox =
document.getElementById(
"totalRevenue"
);



const expenseBox =
document.getElementById(
"totalExpense"
);



const profitBox =
document.getElementById(
"totalProfit"
);



const playersBox =
document.getElementById(
"totalPlayers"
);






if(revenueBox)

revenueBox.innerHTML =
"₱"+
revenue.toLocaleString();





if(expenseBox)

expenseBox.innerHTML =
"₱"+
expense.toLocaleString();





if(profitBox)

profitBox.innerHTML =
"₱"+
profit.toLocaleString();





if(playersBox)

playersBox.innerHTML =
players;



}
