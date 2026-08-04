/*==================================================
 CABADBARAN PULLERS
 TOURNAMENT REGISTRATION SYSTEM
==================================================*/


const REGISTRATION_API =
"https://script.google.com/macros/s/AKfycbz9HwWRzBZO2weFw9ywY5I7oeP5Tb5e_MhKjy5K8l_dUcVSjG34ChUEgqqgJo8mJGwJ/exec";





/*==================================================
 START SYSTEM
==================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const form =
document.getElementById(
"registrationForm"
);



if(form){

form.addEventListener(
"submit",
submitRegistration
);

}


});









/*==================================================
 SUBMIT REGISTRATION
==================================================*/


async function submitRegistration(e){


e.preventDefault();





const data = {


action:"register",



fullName:
document.getElementById(
"fullName"
).value,



age:
document.getElementById(
"age"
).value,



birthDate:
document.getElementById(
"birthDate"
).value,



contactNumber:
document.getElementById(
"contactNumber"
).value,



address:
document.getElementById(
"address"
).value,



category:
document.getElementById(
"category"
).value,



arm:
document.getElementById(
"arm"
).value,



division:
document.getElementById(
"division"
).value,



weightClass:
document.getElementById(
"weightClass"
).value,



emergencyContactName:
document.getElementById(
"emergencyContactName"
).value,



emergencyContactNumber:
document.getElementById(
"emergencyContactNumber"
).value,



notes:
document.getElementById(
"notes"
).value



};








try{


const response =
await fetch(

REGISTRATION_API,

{


method:"POST",


body:
JSON.stringify(data)


}

);






const result =
await response.json();





console.log(
"REGISTRATION:",
result
);







if(result.success){


alert(
"Registration Submitted Successfully!"
);



document
.getElementById(
"registrationForm"
)
.reset();



}



else{


alert(
result.message
);


}



}





catch(error){


console.error(
"REGISTRATION ERROR:",
error
);



alert(
"Unable to submit registration"
);



}



}
