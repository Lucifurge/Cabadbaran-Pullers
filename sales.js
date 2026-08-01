/*==================================================
 CABADBARAN PULLERS
 SALES MANAGEMENT SYSTEM
 GOOGLE SHEETS CONNECTED
==================================================*/


const SALES_API =
"https://script.google.com/macros/s/AKfycbyA8FCuL4irew7cfmBdbLad7ie4E2FtA7R0GdSCZ06-_EFKVBTmDQr73kCQ-ITZcyw05A/exec";



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
 LOAD SALES FROM SHEET
==================================================*/


async function loadSales(){


try{


const response =
await fetch(
SALES_API+
"?action=sales&t="+Date.now()
);



const result =
await response.json();



console.log(result);



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



cost:
quantity *
COST_PRICE,



profit:
profit,



commission:
commission,



income:
ownerIncome,



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



});



const result =
await response.json();



console.log(result);



alert(
"Sale Added Successfully"
);



document
.getElementById("saleForm")
.reset();



loadSales();



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
 DISPLAY SALES TABLE
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
 DASHBOARD CALCULATIONS
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
)
||
0;




totalSales +=
Number(
sale.SellingPrice
)
||
0;



totalProfit +=
Number(
sale.Profit
)
||
0;



totalIncome +=
Number(
sale.OwnerIncome
)
||
0;



});






const sold =
document.getElementById(
"totalSold"
);



const revenue =
document.getElementById(
"totalRevenue"
);



const profit =
document.getElementById(
"totalProfit"
);



const income =
document.getElementById(
"netIncome"
);






if(sold)
sold.innerHTML =
totalSold;



if(revenue)
revenue.innerHTML =
"₱"+
totalSales.toLocaleString();



if(profit)
profit.innerHTML =
"₱"+
totalProfit.toLocaleString();



if(income)
income.innerHTML =
"₱"+
totalIncome.toLocaleString();



}
