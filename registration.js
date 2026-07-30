/*==================================================
    CABADBARAN PULLERS
    REGISTRATION SYSTEM
==================================================*/

/*==============================
    CONFIG
==============================*/

const CONFIG = {

    API_URL: "https://script.google.com/macros/s/AKfycbzr3fw81KUxG4MLThoQZEhLMOFRugizANgBfTylX7zBL5Detnh9kMZGkjkgVfmTWM6u3w/exec"

};

/*==============================
    ELEMENTS
==============================*/


const form = document.getElementById("registrationForm");

const steps = document.querySelectorAll(".form-step");

const progressSteps = document.querySelectorAll(".step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const submitButton = document.querySelector(".submit-btn");

const successModal = document.getElementById("successModal");
const loadingOverlay = document.getElementById("loadingOverlay");

/*==============================
    CURRENT STEP
==============================*/

let currentStep = 0;

/*==============================
    INITIALIZE
==============================*/

document.addEventListener("DOMContentLoaded", () => {

    showStep(currentStep);

    initializeButtons();

});

/*==============================
    SHOW STEP
==============================*/

function showStep(step){

    steps.forEach((item,index)=>{

        item.classList.toggle("active",index===step);

    });

    progressSteps.forEach((item,index)=>{

        if(index<=step){

            item.classList.add("active");

        }

        else{

            item.classList.remove("active");

        }

    });

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==============================
    BUTTON EVENTS
==============================*/

function initializeButtons(){

    nextButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            if(validateStep(currentStep)){

                if(currentStep < steps.length-1){

                    currentStep++;

                    showStep(currentStep);

                }

            }

        });

    });

    prevButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            if(currentStep>0){

                currentStep--;

                showStep(currentStep);

            }

        });

    });

}

/*==============================
    VALIDATION
==============================*/

function validateStep(stepIndex){

    const current = steps[stepIndex];

    const requiredFields = current.querySelectorAll(

        "input[required], select[required], textarea[required]"

    );

    let valid = true;

    requiredFields.forEach(field=>{

        if(field.type==="radio"){

            const radioGroup = document.querySelectorAll(

                `input[name="${field.name}"]`

            );

            const checked = [...radioGroup].some(r=>r.checked);

            if(!checked){

                valid=false;

            }

            return;

        }

        if(field.type==="checkbox"){

            if(!field.checked){

                valid=false;

                field.parentElement.style.color="#ff4d4d";

            }

            else{

                field.parentElement.style.color="";

            }

            return;

        }

        if(field.value.trim()===""){

            field.style.borderColor="#ff4d4d";

            valid=false;

        }

        else{

            field.style.borderColor="var(--primary)";

        }

    });

    if(!valid){

        alert("Please complete all required fields before continuing.");

    }

    return valid;

}



/*==================================================
    AUTO AGE
==================================================*/

const birthday=document.getElementById("birthday");
const age=document.getElementById("age");

if(birthday){

    birthday.addEventListener("change",calculateAge);

}

function calculateAge(){

    if(!birthday.value){

        age.value="";

        return;

    }

    const birth=new Date(birthday.value);

    const today=new Date();

    let years=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(

        month<0 ||

        (month===0 && today.getDate()<birth.getDate())

    ){

        years--;

    }

    age.value=years;

}

/*==================================================
    MEMBERSHIP PRICE
==================================================*/

const membershipRadios=document.querySelectorAll(

    'input[name="membership"]'

);

const selectedPrice=document.getElementById("selectedPrice");

membershipRadios.forEach(radio=>{

    radio.addEventListener("change",updateMembershipPrice);

});

function updateMembershipPrice(){

    const selected=document.querySelector(

        'input[name="membership"]:checked'

    );

    if(!selected){

        selectedPrice.innerHTML=

        "Please select a membership plan.";

        return;

    }

    switch(selected.value){

        case "Standard":

            selectedPrice.innerHTML=

            "<strong>Standard Member</strong><br>Registration Fee: <span style='color:#D4AF37;'>₱150</span>";

        break;

        case "Athlete":

            selectedPrice.innerHTML=

            "<strong>Athlete Member</strong><br>Registration Fee: <span style='color:#D4AF37;'>₱500</span>";

        break;

        case "Lifetime":

            selectedPrice.innerHTML=

            "<strong>Lifetime Member</strong><br>Registration Fee: <span style='color:#D4AF37;'>₱2,500</span>";

        break;

    }

}

/*==================================================
    AUTO SAVE
==================================================*/

const fields=form.querySelectorAll(

    "input, textarea, select"

);

fields.forEach(field=>{

    const key="cp_"+(field.name || field.id);

    if(field.type==="radio"){

        field.addEventListener("change",()=>{

            localStorage.setItem(key,field.checked);

        });

    }

    else if(field.type==="checkbox"){

        field.addEventListener("change",()=>{

            localStorage.setItem(key,field.checked);

        });

    }

    else{

        field.addEventListener("input",()=>{

            localStorage.setItem(key,field.value);

        });

    }

});

/*==================================================
    RESTORE FORM
==================================================*/

window.addEventListener("DOMContentLoaded",()=>{

    fields.forEach(field=>{

        const key="cp_"+(field.name || field.id);

        const saved=localStorage.getItem(key);

        if(saved===null) return;

        if(field.type==="radio"){

            field.checked=(saved==="true");

        }

        else if(field.type==="checkbox"){

            field.checked=(saved==="true");

        }

        else{

            field.value=saved;

        }

    });

    calculateAge();

    updateMembershipPrice();

});
/*==================================================
    REVIEW PAGE
==================================================*/

function getValue(selector){

    const element=document.querySelector(selector);

    return element ? element.value : "";

}

function getChecked(name){

    const checked=document.querySelector(

        `input[name="${name}"]:checked`

    );

    return checked ? checked.value : "";

}

function updateReview(){

    /*==============================
        PROFILE
    ==============================*/

 document.getElementById("reviewName").textContent =
`${getValue('[name="first_name"]')} ${getValue('[name="last_name"]')}`;

    document.getElementById("reviewEmail").textContent=

        getValue('input[type="email"]');

    document.getElementById("reviewPhone").textContent=

        getValue('input[type="tel"]');

    /*==============================
        PERSONAL
    ==============================*/

    document.getElementById("reviewPersonal").innerHTML=`

        <p><strong>Birthday:</strong> ${birthday.value}</p>

        <p><strong>Age:</strong> ${age.value}</p>

        <p><strong>Gender:</strong> ${document.querySelector('select').value}</p>

        <p><strong>Facebook:</strong> ${getValue('input[type="url"]')}</p>

        <p><strong>Address:</strong> ${document.querySelector('textarea').value}</p>

    `;

    /*==============================
        EMERGENCY
    ==============================*/

    document.getElementById("reviewEmergency").innerHTML=`

        <p><strong>Name:</strong> ${getValue('[name="emergency_name"]')}</p>

        <p><strong>Relationship:</strong> ${getValue('[name="relationship"]')}</p>

        <p><strong>Phone:</strong> ${getValue('[name="emergency_phone"]')}</p>

        <p><strong>Blood Type:</strong> ${getValue('[name="blood_type"]')}</p>

        <p><strong>Address:</strong> ${getValue('[name="emergency_address"]')}</p>

    `;

    /*==============================
        ARM WRESTLING
    ==============================*/

    document.getElementById("reviewArm").innerHTML=`

        <p><strong>Experience:</strong> ${getValue('[name="experience_level"]')}</p>

        <p><strong>Dominant Hand:</strong> ${getValue('[name="dominant_hand"]')}</p>

        <p><strong>Competition Arm:</strong> ${getValue('[name="competition_arm"]')}</p>

        <p><strong>Weight:</strong> ${getValue('[name="weight"]')} kg</p>

        <p><strong>Height:</strong> ${getValue('[name="height"]')} cm</p>

        <p><strong>Weight Class:</strong> ${getValue('[name="weight_class"]')}</p>

        <p><strong>Club:</strong> ${getValue('[name="club"]')}</p>

        <p><strong>Experience:</strong> ${getValue('[name="years"]')} year(s)</p>

    `;

    /*==============================
        MEMBERSHIP
    ==============================*/

    document.getElementById("reviewMembership").innerHTML=`

        <p><strong>Membership:</strong> ${getChecked("membership")}</p>

        <p><strong>Fee:</strong> ${selectedPrice.textContent}</p>

    `;

}

/*==================================================
    UPDATE REVIEW BEFORE STEP 5
==================================================*/

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(currentStep===4){

            updateReview();

        }

    });

});

/*==================================================
    BUILD FORM DATA
==================================================*/

function buildFormData(){

  return {

    timestamp: new Date().toISOString(),

    /* PERSONAL */
    FirstName: getValue('[name="first_name"]'),
    MiddleName: getValue('[name="middle_name"]'),
    LastName: getValue('[name="last_name"]'),

    Birthday: birthday.value,
    Age: age.value,
    Gender: document.querySelectorAll("select")[0].value,
    Email: getValue('input[type="email"]'),
    Phone: getValue('input[type="tel"]'),
    Facebook: getValue('input[type="url"]'),
    Address: document.querySelectorAll("textarea")[0].value,

    /* EMERGENCY */
    EmergencyName: getValue('[name="emergency_name"]'),
    Relationship: getValue('[name="relationship"]'),
    EmergencyPhone: getValue('[name="emergency_phone"]'),
    BloodType: getValue('[name="blood_type"]'),
    EmergencyAddress: getValue('[name="emergency_address"]'),
    MedicalConditions: getValue('[name="medical_conditions"]'),
    Allergies: getValue('[name="allergies"]'),
    EmergencyNotes: getValue('[name="emergency_notes"]'),

    /* ARM WRESTLING */
    ExperienceLevel: getValue('[name="experience_level"]'),
    DominantHand: getValue('[name="dominant_hand"]'),
    CompetitionArm: getValue('[name="competition_arm"]'),
    Weight: getValue('[name="weight"]'),
    Height: getValue('[name="height"]'),
    WeightClass: getValue('[name="weight_class"]'),
    Club: getValue('[name="club"]'),
    YearsExperience: getValue('[name="years"]'),
    Competitions: getValue('[name="competitions"]'),
    Achievements: getValue('[name="achievements"]'),
    Motivation: getValue('[name="motivation"]'),

    /* MEMBERSHIP */
    Membership: getChecked("membership"),
    PaymentStatus: "Pending",
    ApplicationStatus: "Pending"

};
}

/*==================================================
    SUBMIT TO GOOGLE APPS SCRIPT
==================================================*/

/*==================================================
    SUBMIT TO GOOGLE APPS SCRIPT
==================================================*/

async function submitRegistration() {

   const data = buildFormData();

const formData = new FormData();

formData.append("action", "register");

Object.keys(data).forEach(key => {

    formData.append(key, data[key] ?? "");

});

    submitButton.classList.add("loading");
    submitButton.disabled = true;
   loadingOverlay.style.display = "flex";
   try {

    const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    console.log(result);

    if (result.success) {
        registrationSuccess();
    } else {
        alert(result.message || "Registration failed.");
    }

} catch (error) {

    console.error(error);
    alert("Unable to connect to the server.");

} finally {

    loadingOverlay.style.display = "none";

    submitButton.classList.remove("loading");

    submitButton.disabled = false;

}
}

/*==================================================
    SUCCESS
==================================================*/

function registrationSuccess(){

    clearSavedData();

    form.reset();

    currentStep=0;

    showStep(currentStep);


    selectedPrice.innerHTML=
    "Please select a membership plan.";

    successModal.classList.add("active");

}

/*==================================================
    CLOSE SUCCESS MODAL
==================================================*/

window.addEventListener("click",(e)=>{

    if(e.target===successModal){

        successModal.classList.remove("active");

    }

});

/*==================================================
    CLEAR LOCAL STORAGE
==================================================*/

function clearSavedData(){

    Object.keys(localStorage).forEach(key=>{

        if(key.startsWith("cp_")){

            localStorage.removeItem(key);

        }

    });

}

/*==================================================
    RESET FORM
==================================================*/

function resetRegistration(){

    clearSavedData();

    form.reset();

   
    currentStep=0;

    showStep(currentStep);

}

/*==================================================
    PREVENT DOUBLE SUBMIT
==================================================*/

let isSubmitting = false;

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (isSubmitting) return;

    if (!validateStep(currentStep)) return;

    isSubmitting = true;

    await submitRegistration();

    isSubmitting = false;

});

/*==================================================
    ENTER KEY SUPPORT
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        const active=document.querySelector(".form-step.active");

        if(!active) return;

        const tag=document.activeElement.tagName;

        if(tag==="TEXTAREA") return;

        e.preventDefault();

        const next=active.querySelector(".next-btn");

        if(next){

            next.click();

        }

    }

});

/*==================================================
    PHONE VALIDATION
==================================================*/

document.querySelectorAll('input[type="tel"]').forEach(input=>{

    input.addEventListener("input",()=>{

        input.value=input.value.replace(/[^0-9]/g,"");

        if(input.value.length>11){

            input.value=input.value.slice(0,11);

        }

    });

});

/*==================================================
    EMAIL VALIDATION
==================================================*/

document.querySelectorAll('input[type="email"]').forEach(input=>{

    input.addEventListener("blur",()=>{

        const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(input.value && !pattern.test(input.value)){

            input.style.borderColor="#ff4d4d";

        }

        else{

            input.style.borderColor="var(--primary)";

        }

    });

});



/*==================================================
    DEBUG
==================================================*/

console.log(
"%cCabadbaran Pullers Registration System Ready",
"color:#D4AF37;font-size:15px;font-weight:bold;"
);
