/* =========================================
   RAPID LIGHT AUTHENTICATION
========================================= */

let selectedRole = null;


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }
}


/* =========================================
   WELCOME ROLE SELECTION
========================================= */

function selectRole(role) {

    selectedRole = role;

    const workerCard =
        document.getElementById("workerCard");

    const employerCard =
        document.getElementById("employerCard");

    workerCard.classList.remove("selected");
    employerCard.classList.remove("selected");

    if (role === "worker") {
        workerCard.classList.add("selected");
    }

    if (role === "employer") {
        employerCard.classList.add("selected");
    }

    document.getElementById(
        "continueWelcomeBtn"
    ).disabled = false;
}


/* =========================================
   WELCOME CONTINUE
========================================= */

function continueFromWelcome() {

    if (!selectedRole) {

        alert("Please select your role first.");

        return;
    }

    updateRoleText();

    showScreen("loginScreen");
}


/* =========================================
   SIGN IN START
========================================= */

function startSignIn() {

    selectedRole = null;

    document
        .getElementById("loginWorkerCard")
        .classList.remove("selected");

    document
        .getElementById("loginEmployerCard")
        .classList.remove("selected");

    document
        .getElementById("loginContinueBtn")
        .disabled = true;

    showScreen("roleScreen");
}


/* =========================================
   LOGIN ROLE SELECTION
========================================= */

function selectLoginRole(role) {

    selectedRole = role;

    const workerCard =
        document.getElementById("loginWorkerCard");

    const employerCard =
        document.getElementById("loginEmployerCard");

    workerCard.classList.remove("selected");
    employerCard.classList.remove("selected");

    if (role === "worker") {

        workerCard.classList.add("selected");

    }

    if (role === "employer") {

        employerCard.classList.add("selected");

    }

    document.getElementById(
        "loginContinueBtn"
    ).disabled = false;
}


/* =========================================
   LOGIN ROLE CONTINUE
========================================= */

function continueToLogin() {

    if (!selectedRole) {

        alert("Please select your role first.");

        return;
    }

    updateRoleText();

    showScreen("loginScreen");
}


/* =========================================
   UPDATE ROLE TEXT
========================================= */

function updateRoleText() {

    let roleName = "";

    if (selectedRole === "worker") {

        roleName = "👷 Gig Worker";

    } else if (selectedRole === "employer") {

        roleName = "🏢 Employer";

    }

    const loginRoleText =
        document.getElementById("loginRoleText");

    const signupRoleText =
        document.getElementById("signupRoleText");

    if (loginRoleText) {

        loginRoleText.innerText =
            "Signing in as " + roleName;
    }

    if (signupRoleText) {

        signupRoleText.innerText =
            "Creating account as " + roleName;
    }
}


/* =========================================
   LOGIN
========================================= */

function loginUser(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value
            .trim();

    const errorBox =
        document.getElementById("loginError");


    errorBox.classList.remove("show");
    errorBox.innerText = "";


    /* Role validation */

    if (!selectedRole) {

        errorBox.innerText =
            "Please select your role first.";

        errorBox.classList.add("show");

        showScreen("roleScreen");

        return;
    }


    /* Email validation */

    if (!email) {

        errorBox.innerText =
            "Please enter your email.";

        errorBox.classList.add("show");

        return;
    }


    /* Password validation */

    if (!password) {

        errorBox.innerText =
            "Please enter your password.";

        errorBox.classList.add("show");

        return;
    }


    /*
       Demo authentication

       Later backend/API connect kar sakte ho.
    */

    localStorage.setItem(
        "rapidLightLoggedIn",
        "true"
    );

    localStorage.setItem(
        "rapidLightUserRole",
        selectedRole
    );

    localStorage.setItem(
        "rapidLightUserEmail",
        email
    );


    /* Dashboard redirect */

    if (selectedRole === "worker") {

        window.location.href =
            "worker/dashboard.html";

        return;
    }


    if (selectedRole === "employer") {

        window.location.href =
            "employer/dashboard.html";

        return;
    }

}


/* =========================================
   GOOGLE LOGIN
========================================= */

function googleLogin() {

    if (!selectedRole) {

        alert("Please select your role first.");

        showScreen("roleScreen");

        return;
    }


    /*
       Demo Google login.

       Real Google OAuth backend/API
       baad me connect kar sakte ho.
    */

    localStorage.setItem(
        "rapidLightLoggedIn",
        "true"
    );

    localStorage.setItem(
        "rapidLightUserRole",
        selectedRole
    );

    localStorage.setItem(
        "rapidLightUserEmail",
        "google-user@demo.com"
    );


    if (selectedRole === "worker") {

        window.location.href =
            "worker/dashboard.html";

        return;
    }


    if (selectedRole === "employer") {

        window.location.href =
            "employer/dashboard.html";

        return;
    }

}


/* =========================================
   SIGNUP
========================================= */

function showSignup() {

    if (!selectedRole) {

        alert("Please select your role first.");

        showScreen("roleScreen");

        return;
    }

    updateRoleText();

    showScreen("signupScreen");
}


/* =========================================
   CREATE ACCOUNT
========================================= */

function createAccount(event) {

    event.preventDefault();


    const fullName =
        document
            .getElementById("fullName")
            .value
            .trim();

    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim();

    const mobile =
        document
            .getElementById("mobileNumber")
            .value
            .trim();

    const password =
        document
            .getElementById("signupPassword")
            .value
            .trim();

    const terms =
        document
            .getElementById("terms")
            .checked;

    const errorBox =
        document.getElementById("signupError");


    errorBox.classList.remove("show");
    errorBox.innerText = "";


    /* Role */

    if (!selectedRole) {

        errorBox.innerText =
            "Please select your role first.";

        errorBox.classList.add("show");

        showScreen("roleScreen");

        return;
    }


    /* Name */

    if (!fullName) {

        errorBox.innerText =
            "Please enter your full name.";

        errorBox.classList.add("show");

        return;
    }


    /* Email */

    if (!email) {

        errorBox.innerText =
            "Please enter your email.";

        errorBox.classList.add("show");

        return;
    }


    /* Mobile */

    if (!mobile) {

        errorBox.innerText =
            "Please enter your mobile number.";

        errorBox.classList.add("show");

        return;
    }


    /* Password */

    if (password.length < 6) {

        errorBox.innerText =
            "Password must be at least 6 characters.";

        errorBox.classList.add("show");

        return;
    }


    /* Terms */

    if (!terms) {

        errorBox.innerText =
            "Please accept the Terms & Conditions.";

        errorBox.classList.add("show");

        return;
    }


    /*
       Save user information
    */

    localStorage.setItem(
        "rapidLightLoggedIn",
        "true"
    );

    localStorage.setItem(
        "rapidLightUserRole",
        selectedRole
    );

    localStorage.setItem(
        "rapidLightUserName",
        fullName
    );

    localStorage.setItem(
        "rapidLightUserEmail",
        email
    );

    localStorage.setItem(
        "rapidLightUserMobile",
        mobile
    );


    /*
       Redirect based on role
    */

    if (selectedRole === "worker") {

        window.location.href =
            "worker/dashboard.html";

        return;
    }


    if (selectedRole === "employer") {

        window.location.href =
            "employer/dashboard.html";

        return;
    }

}


/* =========================================
   PASSWORD TOGGLE
========================================= */

function togglePassword(inputId) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "rapidLightLoggedIn"
    );

    localStorage.removeItem(
        "rapidLightUserRole"
    );

    localStorage.removeItem(
        "rapidLightUserName"
    );

    localStorage.removeItem(
        "rapidLightUserEmail"
    );

    localStorage.removeItem(
        "rapidLightUserMobile"
    );

    window.location.href =
        "../index.html";
}


/* =========================================
   AUTH CHECK
========================================= */

function checkLogin(requiredRole) {

    const loggedIn =
        localStorage.getItem(
            "rapidLightLoggedIn"
        );

    const role =
        localStorage.getItem(
            "rapidLightUserRole"
        );


    if (
        loggedIn !== "true" ||
        role !== requiredRole
    ) {

        window.location.href =
            "../index.html";

        return false;
    }

    return true;
}


/* =========================================
   CURRENT USER
========================================= */

function getCurrentUser() {

    return {

        loggedIn:
            localStorage.getItem(
                "rapidLightLoggedIn"
            ),

        role:
            localStorage.getItem(
                "rapidLightUserRole"
            ),

        name:
            localStorage.getItem(
                "rapidLightUserName"
            ),

        email:
            localStorage.getItem(
                "rapidLightUserEmail"
            ),

        mobile:
            localStorage.getItem(
                "rapidLightUserMobile"
            )

    };

}