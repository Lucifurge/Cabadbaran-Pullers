
const WEB_APP_URL="PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";
document.getElementById("regForm").onsubmit=async(e)=>{
e.preventDefault();
const data=Object.fromEntries(new FormData(e.target).entries());
const r=await fetch(WEB_APP_URL,{
method:"POST",
body:JSON.stringify(data)
});
document.getElementById("msg").innerHTML="Registration submitted!";
e.target.reset();
};
