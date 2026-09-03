const gigForm = document.getElementById("gigForm");

const previewModal = document.getElementById("previewModal");
const successModal = document.getElementById("successModal");


/* SET MINIMUM DATE */

document.addEventListener("DOMContentLoaded", function () {

    const dateInput = document.getElementById("gigDate");

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
});


/* GET FORM DATA */

function getGigData() {

    const skillsValue =
        document.getElementById("gigSkills").value.trim();

    const skills = skillsValue
        ? skillsValue
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
        : [];


    return {

        id: Date.now(),

        title:
            document.getElementById("gigTitle").value.trim(),

        category:
            document.getElementById("gigCategory").value,

        description:
            document.getElementById("gigDescription").value.trim(),

        location:
            document.getElementById("gigLocation").value.trim(),

        date:
            document.getElementById("gigDate").value,

        time:
            document.getElementById("gigTime").value,

        duration:
            document.getElementById("gigDuration").value,

        payment:
            Number(document.getElementById("gigPayment").value),

        workersRequired:
            Number(document.getElementById("workersRequired").value),

        skills: skills,

        requirements:
            document
                .getElementById("specialRequirements")
                .value
                .trim(),

        status: "Posted",

        applications: 0,

        createdAt:
            new Date().toISOString()
    };
}


/* FORMAT DATE */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


/* FORMAT TIME */

function formatTime(timeString) {

    if (!timeString) {
        return "-";
    }

    const [hour, minute] = timeString.split(":");

    const date = new Date();

    date.setHours(
        Number(hour),
        Number(minute)
    );

    return date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}


/* PREVIEW */

function previewGig() {

    if (!gigForm.checkValidity()) {

        gigForm.reportValidity();

        return;
    }


    const gig = getGigData();


    document.getElementById("previewCategory")
        .textContent = gig.category;

    document.getElementById("previewTitle")
        .textContent = gig.title;

    document.getElementById("previewLocation")
        .textContent = "📍 " + gig.location;

    document.getElementById("previewPayment")
        .textContent = "₹" + gig.payment.toLocaleString("en-IN");

    document.getElementById("previewDate")
        .textContent = formatDate(gig.date);

    document.getElementById("previewTime")
        .textContent = formatTime(gig.time);

    document.getElementById("previewDuration")
        .textContent = gig.duration;

    document.getElementById("previewWorkers")
        .textContent = gig.workersRequired;

    document.getElementById("previewDescription")
        .textContent = gig.description;

    document.getElementById("previewRequirements")
        .textContent =
        gig.requirements || "No special requirements";


    const skillsContainer =
        document.getElementById("previewSkills");

    skillsContainer.innerHTML = "";


    if (gig.skills.length === 0) {

        skillsContainer.innerHTML =
            "<span>No specific skills mentioned</span>";

    } else {

        gig.skills.forEach(skill => {

            const chip = document.createElement("span");

            chip.className = "skill-chip";

            chip.textContent = skill;

            skillsContainer.appendChild(chip);
        });
    }


    previewModal.classList.add("show");
}


/* CLOSE PREVIEW */

function closePreview() {

    previewModal.classList.remove("show");
}


/* PUBLISH FROM FORM */

gigForm.addEventListener("submit", function (event) {

    event.preventDefault();

    publishGig();
});


/* PUBLISH FROM PREVIEW */

function publishFromPreview() {

    publishGig();
}


/* PUBLISH GIG */

function publishGig() {

    if (!gigForm.checkValidity()) {

        previewModal.classList.remove("show");

        gigForm.reportValidity();

        return;
    }


    const gig = getGigData();


    let employerGigs =
        JSON.parse(
            localStorage.getItem("rapidLightEmployerGigs")
        ) || [];


    employerGigs.unshift(gig);


    localStorage.setItem(
        "rapidLightEmployerGigs",
        JSON.stringify(employerGigs)
    );


    previewModal.classList.remove("show");

    successModal.classList.add("show");
}


/* BACK */

function goBack() {

    window.location.href = "dashboard.html";
}


/* MY GIGS */

function goToMyGigs() {

    window.location.href =
        "dashboard.html#my-gigs";
}


/* CREATE ANOTHER */

function createAnotherGig() {

    successModal.classList.remove("show");

    gigForm.reset();

    document.getElementById("workersRequired").value = 1;
}