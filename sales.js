/*==================================================
 CABADBARAN PULLERS
 SALES MANAGEMENT SYSTEM
==================================================*/


const SALES_API = 
"https://script.google.com/macros/s/AKfycbyi3AUaCzeIgH_katrrUPC5YfbqH5jkYr3E12WQLhe-l_ImjUW0iUNaaL171nObw5kzFw/exec";



const SELLING_PRICE = 380;
const PRODUCT_COST = 300;
const PROFIT = 80;



let sales = [];






/*==================================================
 START SYSTEM
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


const response =
await fetch(
SALES_API + "?action=sales"
);



const result =
await response.json();



console.log(
"SALES:",
result
);



if(result.success){


sales =
result.data || [];



displaySales();


updateDashboard();



}



}

catch(error){


console.error(
"LOAD SALES ERROR:",
error
);



alert(
"Unable to load sales"
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
quantity * PROFIT;



const commissionRate =
Number(
document.getElementById("commission").value
);



const commission =
profit *
(
commissionRate / 100
);



const ownerIncome =
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


quantity:
quantity,


seller:
document.getElementById("seller").value
||
"Owner",



sellingPrice:
quantity *
SELLING_PRICE,



productCost:
quantity *
PRODUCT_COST,



profit:
profit,



commission:
commission,



ownerIncome:
ownerIncome,



paymentStatus:
document.getElementById("payment").value



};






try{


const response =
await fetch(
SALES_API,
{


method:"POST",


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
"Sale Recorded Successfully"
);



document
.getElementById("saleForm")
.reset();



loadSales();



}



}

catch(error){


console.error(
"ADD SALE ERROR:",
error
);



alert(
"Failed to save sale"
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


let totalSold = 0;

let totalSales = 0;

let totalProfit = 0;

let totalIncome = 0;




sales.forEach(
sale=>{


totalSold +=
Number(
sale.Quantity
) || 0;



totalSales +=
Number(
sale.SellingPrice
) || 0;



totalProfit +=
Number(
sale.Profit
) || 0;



totalIncome +=
Number(
sale.OwnerIncome
) || 0;



});






document.getElementById(
"totalSold"
).innerHTML =
totalSold;



document.getElementById(
"totalSales"
).innerHTML =
"₱" +
totalSales.toLocaleString();



document.getElementById(
"totalProfit"
).innerHTML =
"₱" +
totalProfit.toLocaleString();



document.getElementById(
"ownerIncome"
).innerHTML =
"₱" +
totalIncome.toLocaleString();



}
