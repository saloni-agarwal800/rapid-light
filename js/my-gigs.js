/* =========================================
   RAPID LIGHT - MY GIGS
========================================= */

const MY_GIGS_KEY =
    "rapidLightMyGigs";

let currentTab = "Applied";

let currentRatingGigId = null;

let selectedRating = 0;


/* =========================================
   DEMO GIG DATA
========================================= */

const defaultGigs = [

    {
        id: 1,

        title: "House Cleaning",

        category: "Home Services",

        employer: "HomeCare Services",

        location: "Ashok Nagar, Jaipur",

        date: "Today",

        time: "5:00 PM",

        duration: "2 Hours",

        payment: 600,

        status: "Applied",

        description:
            "Need a reliable worker for basic house cleaning including dusting, mopping and room cleaning.",

        skills:
            "Cleaning, Time Management",

        appliedOn:
            "Today"
    },


    {
        id: 2,

        title: "Packing Assistant",

        category: "Moving & Loading",

        employer: "QuickMove Packers",

        location: "Mansarovar, Jaipur",

        date: "Tomorrow",

        time: "10:00 AM",

        duration: "4 Hours",

        payment: 1000,

        status: "Accepted",

        description:
            "Assist the team with packing household items and loading boxes.",

        skills:
            "Physical Work, Packing",

        appliedOn:
            "Yesterday"
    },


    {
        id: 3,

        title: "Local Parcel Delivery",

        category: "Delivery & Logistics",

        employer: "Rapid Delivery",

        location: "Vaishali Nagar, Jaipur",

        date: "Today",

        time: "2:00 PM",

        duration: "3 Hours",

        payment: 450,

        status: "Active",

        description:
            "Deliver local parcels safely and on time to customers within Jaipur.",

        skills:
            "Driving, Navigation, Communication",

        appliedOn:
            "2 days ago"
    },


    {
        id: 4,

        title: "Event Helper",

        category: "Events",

        employer: "Royal Events Jaipur",

        location: "C-Scheme, Jaipur",

        date: "28 Aug 2026",

        time: "6:00 PM",

        duration: "5 Hours",

        payment: 800,

        status: "Completed",

        description:
            "Assist with event setup, guest support and cleanup after the event.",

        skills:
            "Event Support, Communication",

        appliedOn:
            "20 Aug 2026",

        rating: 5,

        comment:
            "Good experience. Employer was very supportive."
    }

];


/* =========================================
   LOAD GIGS
========================================= */

function getGigs() {

    const saved =
        localStorage.getItem(MY_GIGS_KEY);

    if (!saved) {

        localStorage.setItem(
            MY_GIGS_KEY,
            JSON.stringify(defaultGigs)
        );

        return defaultGigs;
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        localStorage.setItem(
            MY_GIGS_KEY,
            JSON.stringify(defaultGigs)
        );

        return defaultGigs;
    }
}


/* =========================================
   SAVE GIGS
========================================= */

function saveGigs(gigs) {

    localStorage.setItem(
        MY_GIGS_KEY,
        JSON.stringify(gigs)
    );
}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadGigs();

    }
);


/* =========================================
   LOAD / RENDER
========================================= */

function loadGigs() {

    const gigs = getGigs();

    updateCounts(gigs);

    renderGigs(gigs);
}


/* =========================================
   UPDATE COUNTS
========================================= */

function updateCounts(gigs) {

    const applied =
        gigs.filter(
            gig => gig.status === "Applied"
        ).length;

    const accepted =
        gigs.filter(
            gig => gig.status === "Accepted"
        ).length;

    const active =
        gigs.filter(
            gig => gig.status === "Active"
        ).length;

    const completed =
        gigs.filter(
            gig => gig.status === "Completed"
        ).length;


    document.getElementById(
        "appliedCount"
    ).innerText = applied;

    document.getElementById(
        "acceptedCount"
    ).innerText = accepted;

    document.getElementById(
        "activeCount"
    ).innerText = active;

    document.getElementById(
        "completedCount"
    ).innerText = completed;
}


/* =========================================
   CHANGE TAB
========================================= */

function changeTab(tabName) {

    currentTab = tabName;


    document
        .querySelectorAll(".tab")
        .forEach(function(tab) {

            tab.classList.remove("active");

            if (
                tab.dataset.tab === tabName
            ) {
                tab.classList.add("active");
            }

        });


    loadGigs();
}


/* =========================================
   RENDER GIGS
========================================= */

function renderGigs(gigs) {

    const gigList =
        document.getElementById("gigList");

    const emptyState =
        document.getElementById("emptyState");


    const filteredGigs =
        gigs.filter(
            gig => gig.status === currentTab
        );


    gigList.innerHTML = "";


    if (filteredGigs.length === 0) {

        gigList.style.display = "none";

        emptyState.classList.add("show");

        updateEmptyMessage();

        return;
    }


    gigList.style.display = "flex";

    emptyState.classList.remove("show");


    filteredGigs.forEach(function(gig) {

        const card =
            createGigCard(gig);

        gigList.appendChild(card);

    });
}


/* =========================================
   CREATE GIG CARD
========================================= */

function createGigCard(gig) {

    const card =
        document.createElement("article");

    card.className = "gig-card";


    const statusClass =
        getStatusClass(gig.status);


    let actionButtons = `
        <button
            class="card-button view-button"
            onclick="viewGig(${gig.id})"
        >
            View Details
        </button>
    `;


    if (gig.status === "Active") {

        actionButtons += `
            <button
                class="card-button complete-button"
                onclick="completeGig(${gig.id})"
            >
                Mark Completed
            </button>
        `;
    }


    if (
        gig.status === "Completed" &&
        !gig.rating
    ) {

        actionButtons += `
            <button
                class="card-button rate-button"
                onclick="openRating(${gig.id})"
            >
                Rate Gig
            </button>
        `;
    }


    let ratingHTML = "";


    if (gig.status === "Completed" && gig.rating) {

        ratingHTML = `
            <div class="rating-display">

                <div class="rating-stars">
                    ${getStars(gig.rating)}
                </div>

                ${
                    gig.comment
                    ? `<div class="rating-comment">
                        ${escapeHTML(gig.comment)}
                       </div>`
                    : ""
                }

            </div>
        `;
    }


    card.innerHTML = `

        <div class="gig-top">

            <div>

                <div class="gig-category">
                    ${escapeHTML(gig.category)}
                </div>

                <h2 class="gig-title">
                    ${escapeHTML(gig.title)}
                </h2>

                <div class="employer-name">
                    ${escapeHTML(gig.employer)}
                </div>

            </div>

            <span
                class="status-badge ${statusClass}"
            >
                ${escapeHTML(gig.status)}
            </span>

        </div>


        <div class="gig-info">

            <div class="info-item">

                <span class="info-label">
                    📍 Location
                </span>

                <span class="info-value">
                    ${escapeHTML(gig.location)}
                </span>

            </div>


            <div class="info-item">

                <span class="info-label">
                    📅 Date
                </span>

                <span class="info-value">
                    ${escapeHTML(gig.date)}
                </span>

            </div>


            <div class="info-item">

                <span class="info-label">
                    ⏰ Time
                </span>

                <span class="info-value">
                    ${escapeHTML(gig.time)}
                </span>

            </div>


            <div class="info-item">

                <span class="info-label">
                    ⌛ Duration
                </span>

                <span class="info-value">
                    ${escapeHTML(gig.duration)}
                </span>

            </div>

        </div>


        <div class="payment-row">

            <span class="payment-label">
                Payment
            </span>

            <span class="payment-value">
                ₹${Number(gig.payment).toLocaleString("en-IN")}
            </span>

        </div>


        ${ratingHTML}


        <div class="card-actions">

            ${actionButtons}

        </div>

    `;


    return card;
}


/* =========================================
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    switch (status) {

        case "Applied":
            return "status-applied";

        case "Accepted":
            return "status-accepted";

        case "Active":
            return "status-active";

        case "Completed":
            return "status-completed";

        default:
            return "";
    }
}


/* =========================================
   VIEW GIG
========================================= */

function viewGig(id) {

    const gigs = getGigs();

    const gig =
        gigs.find(
            item => item.id === id
        );


    if (!gig) {

        alert("Gig not found.");

        return;
    }


    const content =
        document.getElementById(
            "gigDetailsContent"
        );


    content.innerHTML = `

        <div class="detail-category">
            ${escapeHTML(gig.category)}
        </div>

        <h2 class="detail-title">
            ${escapeHTML(gig.title)}
        </h2>

        <div class="detail-employer">
            🏢 ${escapeHTML(gig.employer)}
        </div>


        <div class="detail-grid">

            <div class="detail-box">

                <span>
                    Payment
                </span>

                <strong>
                    ₹${Number(gig.payment).toLocaleString("en-IN")}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Status
                </span>

                <strong>
                    ${escapeHTML(gig.status)}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Date
                </span>

                <strong>
                    ${escapeHTML(gig.date)}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Time
                </span>

                <strong>
                    ${escapeHTML(gig.time)}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Duration
                </span>

                <strong>
                    ${escapeHTML(gig.duration)}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Location
                </span>

                <strong>
                    ${escapeHTML(gig.location)}
                </strong>

            </div>

        </div>


        <div class="detail-section">

            <h3>
                Description
            </h3>

            <p>
                ${escapeHTML(gig.description)}
            </p>

        </div>


        <div class="detail-section">

            <h3>
                Skills Required
            </h3>

            <p>
                ${escapeHTML(gig.skills)}
            </p>

        </div>

    `;


    openModal("detailsModal");
}


/* =========================================
   COMPLETE GIG
========================================= */

function completeGig(id) {

    const gigs = getGigs();

    const gig =
        gigs.find(
            item => item.id === id
        );


    if (!gig) {
        return;
    }


    const confirmation =
        confirm(
            `Mark "${gig.title}" as completed?`
        );


    if (!confirmation) {
        return;
    }


    gig.status = "Completed";

    gig.completedOn =
        new Date().toLocaleDateString(
            "en-IN"
        );


    saveGigs(gigs);

    alert(
        "Gig marked as completed successfully!"
    );

    currentTab = "Completed";

    document
        .querySelectorAll(".tab")
        .forEach(function(tab) {

            tab.classList.remove("active");

            if (
                tab.dataset.tab === "Completed"
            ) {
                tab.classList.add("active");
            }

        });


    loadGigs();
}


/* =========================================
   OPEN RATING
========================================= */

function openRating(id) {

    currentRatingGigId = id;

    selectedRating = 0;


    document.getElementById(
        "ratingComment"
    ).value = "";


    document.getElementById(
        "ratingText"
    ).innerText =
        "Select a rating";


    updateStars();

    openModal("ratingModal");
}


/* =========================================
   SELECT RATING
========================================= */

function selectRating(rating) {

    selectedRating = rating;

    updateStars();


    const messages = {

        1: "Very poor",

        2: "Needs improvement",

        3: "Good",

        4: "Very good",

        5: "Excellent!"

    };


    document.getElementById(
        "ratingText"
    ).innerText =
        messages[rating];
}


/* =========================================
   UPDATE STARS
========================================= */

function updateStars() {

    document
        .querySelectorAll(".star")
        .forEach(function(star) {

            const rating =
                Number(
                    star.dataset.rating
                );

            if (
                rating <= selectedRating
            ) {

                star.classList.add(
                    "selected"
                );

            } else {

                star.classList.remove(
                    "selected"
                );

            }

        });
}


/* =========================================
   SUBMIT RATING
========================================= */

function submitRating() {

    if (
        !currentRatingGigId ||
        selectedRating === 0
    ) {

        alert(
            "Please select a rating first."
        );

        return;
    }


    const comment =
        document
            .getElementById(
                "ratingComment"
            )
            .value
            .trim();


    const gigs = getGigs();


    const gig =
        gigs.find(
            item =>
                item.id === currentRatingGigId
        );


    if (!gig) {

        alert("Gig not found.");

        return;
    }


    gig.rating =
        selectedRating;

    gig.comment =
        comment;


    saveGigs(gigs);


    closeModal("ratingModal");


    alert(
        "Thank you! Your rating has been submitted."
    );


    currentRatingGigId = null;

    selectedRating = 0;


    loadGigs();
}


/* =========================================
   GET STARS
========================================= */

function getStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars +=
            i <= rating
            ? "★"
            : "☆";
    }

    return stars;
}


/* =========================================
   EMPTY MESSAGE
========================================= */

function updateEmptyMessage() {

    const title =
        document.getElementById(
            "emptyTitle"
        );

    const text =
        document.getElementById(
            "emptyText"
        );


    const messages = {

        Applied: {
            title: "No Applied Gigs",
            text:
                "You haven't applied for any gigs yet."
        },

        Accepted: {
            title: "No Accepted Gigs",
            text:
                "Gigs accepted by employers will appear here."
        },

        Active: {
            title: "No Active Gigs",
            text:
                "Your currently active gigs will appear here."
        },

        Completed: {
            title: "No Completed Gigs",
            text:
                "Completed gigs will appear here."
        }

    };


    title.innerText =
        messages[currentTab].title;

    text.innerText =
        messages[currentTab].text;
}


/* =========================================
   MODALS
========================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.add("show");

    }
}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

    }
}


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   NAVIGATION
========================================= */

function goBack() {

    window.history.back();
}


function goHome() {

    window.location.href =
        "dashboard.html";
}


function goToMyGigs() {

    window.location.href =
        "my-gigs.html";
}


function openProfile() {

    alert(
        "Worker profile page coming soon."
    );
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}