/*==================================================
 CABADBARAN PULLERS
 SALES MANAGEMENT SYSTEM
==================================================*/


const SALES_API =
"https://script.google.com/macros/s/AKfycbwhtODGCIK6LGhIrwJGv--GXAMTXbWZf9ewUr4fSLG4ktF0LSmzNiIop6sjlo3UboGcYw/exec";


const SELLING_PRICE = 380;
const COST_PRICE = 300;
const PROFIT_PER_SHIRT = 80;


let sales = [];





/*==================================================
 START
==================================================*/

document.addEventListener(
"DOMContentLoaded",
()=>{


loadSales();


const form =
document.getElementById("saleForm");


if(form){

form.addEventListener(
"submit",
addSale
);

}


});






/*==================================================
 LOAD SALES
==================================================*/


async function loadSales(){


try{


const response = await fetch(

SALES_API +
"?action=sales"

);



const result =
await response.json();



console.log(
"API RESPONSE:",
result
);



if(!result.success){

throw new Error(
result.message
);

}



sales =
result.data || [];



displaySales();

updateDashboard();



}

catch(error){


console.error(
"LOAD ERROR:",
error
);


alert(
"Unable to load sales\n"+error.message
);


}



}









/*==================================================
 ADD SALE
==================================================*/


async function addSale(e){


e.preventDefault();



const quantity =
Number(
document.getElementById("quantity").value
);



const profit =
quantity *
PROFIT_PER_SHIRT;



const commissionRate =
Number(
document.getElementById("commission").value
);



const commission =
profit *
(
commissionRate / 100
);



const income =
profit -
commission;





const data = {


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
||
"Owner",



commission,


payment:
document.getElementById("payment").value



};






try{


const response =
await fetch(

SALES_API,

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



console.log(result);



if(result.success){


alert(
"Sale Added Successfully"
);



document
.getElementById("saleForm")
.reset();



loadSales();



}else{


alert(result.message);


}




}

catch(error){


console.error(
"POST ERROR:",
error
);


alert(
"Error saving sale"
);


}



}









/*==================================================
 DISPLAY SALES
==================================================*/


function displaySales(){


const table =
document.getElementById(
"salesTable"
);



if(!table)
return;



table.innerHTML="";



sales.forEach(
sale=>{


table.innerHTML += `

<tr>

<td>
${sale.Date || ""}
</td>

<td>
${sale.Buyer || ""}
</td>

<td>
${sale.Product || ""}
</td>

<td>
${sale.Quantity || 0}
</td>

<td>
${sale.Seller || ""}
</td>

<td>
₱${Number(
sale.SellingPrice || 0
).toLocaleString()}
</td>

<td>
₱${Number(
sale.Profit || 0
).toLocaleString()}
</td>

<td>
₱${Number(
sale.Commission || 0
).toLocaleString()}
</td>

<td>
₱${Number(
sale.OwnerIncome || 0
).toLocaleString()}
</td>

</tr>

`;

});


}









/*==================================================
 DASHBOARD
==================================================*/


function updateDashboard(){


let sold=0;

let revenue=0;

let profit=0;

let income=0;



sales.forEach(
sale=>{


sold += Number(
sale.Quantity
)||0;


revenue += Number(
sale.SellingPrice
)||0;


profit += Number(
sale.Profit
)||0;


income += Number(
sale.OwnerIncome
)||0;


});




document.getElementById(
"totalSold"
).innerHTML=sold;



document.getElementById(
"totalRevenue"
).innerHTML =
"₱"+revenue.toLocaleString();



document.getElementById(
"totalProfit"
).innerHTML =
"₱"+profit.toLocaleString();



document.getElementById(
"netIncome"
).innerHTML =
"₱"+income.toLocaleString();



}
