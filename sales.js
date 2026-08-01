/*==================================================
 CABADBARAN PULLERS
 SALES SYSTEM WITH GOOGLE SHEETS
==================================================*/


const SALES_API =
"https://script.google.com/macros/s/AKfycby470TaBZ1NSbUlUcMaoPTmubVE9uGfNLrMyJoydoOuSoXpLoo-GzCHC-doWWSuokgVWw/exec";



const SELLING_PRICE = 380;

const COST_PRICE = 300;

const PROFIT = 80;



let sales=[];



document.addEventListener(
"DOMContentLoaded",
()=>{

loadSales();

document
.getElementById("saleForm")
.addEventListener(
"submit",
addSale
);

});





/*=====================================
 LOAD SALES
=====================================*/


async function loadSales(){


try{


let response =
await fetch(
SALES_API+
"?action=sales"
);



let result =
await response.json();



sales=result.data || [];



displaySales();

updateDashboard();



}catch(error){

console.error(error);

alert(
"Unable to load sales"
);

}



}








/*=====================================
 ADD SALE
=====================================*/


async function addSale(e){


e.preventDefault();



let quantity =
Number(
document.getElementById("quantity").value
);



let profit =
quantity * PROFIT;



let commissionRate =
Number(
document.getElementById("commission").value
);



let commission =
profit *
(commissionRate/100);



let income =
profit - commission;



let data={


action:"addSale",


buyer:
document.getElementById("buyer").value,


contact:
document.getElementById("contact").value,


product:
document.getElementById("product").value,


quantity,


seller:
document.getElementById("seller").value
||"Owner",



sellingPrice:
quantity * SELLING_PRICE,



cost:
quantity * COST_PRICE,



profit,


commission,


income,



payment:
document.getElementById("payment").value



};





try{


await fetch(
SALES_API,
{

method:"POST",

body:
JSON.stringify(data)

}

);



alert(
"Sale Added Successfully"
);



document
.getElementById("saleForm")
.reset();



loadSales();



}
catch(error){

console.error(error);

alert(
"Error saving sale"
);


}


}








/*=====================================
 DISPLAY
=====================================*/


function displaySales(){


const table =
document.getElementById(
"salesTable"
);


table.innerHTML="";



sales.forEach(
sale=>{


table.innerHTML += `


<tr>


<td>
${sale.Date}
</td>


<td>
${sale.Buyer}
</td>


<td>
${sale.Product}
</td>


<td>
${sale.Quantity}
</td>


<td>
${sale.Seller}
</td>


<td>
₱${sale.Sales}
</td>


<td>
₱${sale.Profit}
</td>


<td>
₱${sale.Commission}
</td>


<td>
₱${sale.Income}
</td>



</tr>


`;


});


}








/*=====================================
 DASHBOARD
=====================================*/


function updateDashboard(){


let sold=0;

let salesTotal=0;

let profit=0;

let income=0;



sales.forEach(
sale=>{


sold += Number(
sale.Quantity
);



salesTotal += Number(
sale.Sales
);



profit += Number(
sale.Profit
);



income += Number(
sale.Income
);



});



document
.getElementById(
"totalSold"
)
.innerHTML=sold;



document
.getElementById(
"totalRevenue"
)
.innerHTML=
"₱"+
salesTotal.toLocaleString();



document
.getElementById(
"totalProfit"
)
.innerHTML=
"₱"+
profit.toLocaleString();



document
.getElementById(
"netIncome"
)
.innerHTML=
"₱"+
income.toLocaleString();


}
