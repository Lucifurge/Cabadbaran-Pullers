/*==================================================
 CABADBARAN PULLERS
 SUPER TOURNAMENT REGISTRATION SYSTEM
 AUGUST 30, 2026
==================================================*/


const REGISTRATION_API =
"https://script.google.com/macros/s/AKfycbzmr29Ua7kgDlCmq4AbdswujiouYh-YboS59AFsPhkB9PsCxnjKX9kmsIgQvZHYYXdG/exec";



/*==================================================
 START SYSTEM
==================================================*/

document.addEventListener(
"DOMContentLoaded",
() => {

    const form =
    document.getElementById(
        "registrationForm"
    );


    if (form) {

        form.addEventListener(
            "submit",
            submitRegistration
        );

    }

});



/*==================================================
 GET WEIGHT RANGE
==================================================*/

function getWeightRange(category) {

    switch (category) {

        case "Newbie":
            return "Open Weight - CBR Exclusive";

        case "Womens":
            return "Open Weight - Women's";

        case "Light":
            return "55kg - 69kg";

        case "Middle":
            return "70kg - 85kg";

        case "Heavy":
            return "86kg Above";

        default:
            return "";

    }

}



/*==================================================
 GET CATEGORY DESCRIPTION
==================================================*/

function getCategoryName(category) {

    switch (category) {

        case "Newbie":
            return "Newbie - Open Weight (CBR Exclusive)";

        case "Womens":
            return "Women's - Open Weight (Open for All)";

        case "Light":
            return "Light Weight - 55kg-69kg (Open for All)";

        case "Middle":
            return "Middle Weight - 70kg-85kg (Open for All)";

        case "Heavy":
            return "Heavy Weight - 86kg Above (Open for All)";

        default:
            return category;

    }

}



/*==================================================
 SUBMIT REGISTRATION
==================================================*/

async function submitRegistration(e) {

    e.preventDefault();


    /*----------------------------------------------
      GET CATEGORY
    ----------------------------------------------*/

    const categoryElement =
    document.getElementById(
        "category"
    );


    const category =
    categoryElement
    ? categoryElement.value
    : "";


    /*----------------------------------------------
      VALIDATE CATEGORY
    ----------------------------------------------*/

    if (!category) {

        alert(
            "Please select a competition category."
        );

        return;

    }



    /*----------------------------------------------
      BUILD REGISTRATION DATA
    ----------------------------------------------*/

    const data = {

        action: "register",


        event:
        "Cabadbaran Pullers Super Tournament",


        eventDate:
        "August 30, 2026",


        fullName:
        document.getElementById(
            "fullName"
        ).value.trim(),


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
        ).value.trim(),


        address:
        document.getElementById(
            "address"
        ).value.trim(),


        /*------------------------------------------
          NEW CATEGORY SYSTEM
        ------------------------------------------*/

        category:
        getCategoryName(category),


        /*------------------------------------------
          ARM
        ------------------------------------------*/

        arm:
        document.getElementById(
            "arm"
        ).value,


        /*------------------------------------------
          AUTOMATIC WEIGHT RANGE
        ------------------------------------------*/

        weightClass:
        getWeightRange(category),


        /*------------------------------------------
          NO OLD RANKING SYSTEM
        ------------------------------------------*/

        division:
        "Super Tournament",


        /*------------------------------------------
          EMERGENCY CONTACT
        ------------------------------------------*/

        emergencyContactName:
        document.getElementById(
            "emergencyContactName"
        ).value.trim(),


        emergencyContactNumber:
        document.getElementById(
            "emergencyContactNumber"
        ).value.trim(),


        /*------------------------------------------
          NOTES
        ------------------------------------------*/

        notes:
        document.getElementById(
            "notes"
        ).value.trim()

    };



    /*==================================================
     BASIC VALIDATION
    ==================================================*/

    if (!data.fullName) {

        alert(
            "Please enter your full name."
        );

        return;

    }


    if (!data.age) {

        alert(
            "Please enter your age."
        );

        return;

    }


    if (!data.birthDate) {

        alert(
            "Please enter your birth date."
        );

        return;

    }


    if (!data.contactNumber) {

        alert(
            "Please enter your contact number."
        );

        return;

    }



    /*==================================================
     DISABLE BUTTON WHILE SUBMITTING
    ==================================================*/

    const submitButton =
    document.querySelector(
        "#registrationForm button[type='submit']"
    );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> SUBMITTING...';

    }



    /*==================================================
     SEND TO GOOGLE APPS SCRIPT
    ==================================================*/

    try {

        const response =
        await fetch(

            REGISTRATION_API,

            {

                method:
                "POST",

                headers:
                {
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
            "REGISTRATION:",
            result
        );



        /*==================================================
         SUCCESS
        ==================================================*/

        if (result.success) {

            alert(
                "Registration submitted successfully!\n\n" +
                "Category: " +
                data.category
            );


            document
            .getElementById(
                "registrationForm"
            )
            .reset();

        }



        /*==================================================
         ERROR FROM API
        ==================================================*/

        else {

            alert(
                result.message ||
                "Registration could not be completed."
            );

        }

    }



    /*==================================================
     NETWORK ERROR
    ==================================================*/

    catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );


        alert(
            "Unable to submit registration.\n\n" +
            "Please check your internet connection and try again."
        );

    }



    /*==================================================
     RESTORE BUTTON
    ==================================================*/

    finally {

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> SUBMIT REGISTRATION';

        }

    }

}
