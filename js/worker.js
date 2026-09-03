/* =========================================
   RAPID LIGHT - WORKER JAVASCRIPT
========================================= */


/* =========================================
   CATEGORY MODAL
========================================= */

function openCategories() {

    document
        .getElementById("categoryModal")
        .classList.add("show");

}


function closeCategories(event) {

    if (
        !event ||
        event.target.id === "categoryModal"
    ) {

        document
            .getElementById("categoryModal")
            .classList.remove("show");

    }

}


/* =========================================
   FILTER BY CATEGORY
========================================= */

function filterCategory(category) {

    closeCategories();

    const cards =
        document.querySelectorAll(".gig-card");

    let found = false;

    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;

        if (
            category === cardCategory
        ) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (found) {

        document
            .querySelector(".gigs-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    } else {

        alert(
            "No gigs available in " +
            category +
            " right now."
        );

    }

}


/* =========================================
   CLEAR CATEGORY FILTER
========================================= */

function clearFilter() {

    document
        .querySelectorAll(".gig-card")
        .forEach(card => {

            card.style.display = "block";

        });

}


/* =========================================
   SEARCH
========================================= */

function searchGigs() {

    const searchInput =
        document
            .getElementById("gigSearch")
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".gig-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        if (
            text.includes(searchInput)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================================
   FILTER MODAL
========================================= */

function openFilters() {

    document
        .getElementById("filterModal")
        .classList.add("show");

}


function closeFilters(event) {

    if (
        !event ||
        event.target.id === "filterModal"
    ) {

        document
            .getElementById("filterModal")
            .classList.remove("show");

    }

}


/* =========================================
   DISTANCE SLIDER
========================================= */

const distanceRange =
    document.getElementById("distanceRange");


if (distanceRange) {

    distanceRange.addEventListener(
        "input",
        function () {

            document
                .getElementById("distanceValue")
                .innerText = this.value;

        }
    );

}


/* =========================================
   APPLY FILTER
========================================= */

function applyFilters() {

    const distance =
        document
            .getElementById("distanceRange")
            .value;


    const minimumPay =
        document
            .getElementById("minimumPay")
            .value;


    closeFilters();


    alert(
        "Filters applied\n\n" +
        "Distance: " +
        distance +
        " km\n" +
        "Minimum payment: ₹" +
        minimumPay
    );

}


/* =========================================
   GIG DETAILS
========================================= */

function viewGig(gigName) {

    window.location.href =
        "gig-details.html?gig=" +
        encodeURIComponent(gigName);

}


/* =========================================
   ACTIVE GIG
========================================= */

function openActiveGig() {

    alert(
        "ACTIVE GIG\n\n" +

        "Furniture Moving Assistant\n\n" +

        "Your active work details, " +
        "navigation, employer contact, " +
        "start/end work and completion " +
        "features will appear here."
    );

}


/* =========================================
   NAVIGATION
========================================= */

function goHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function openFindGigs() {

    document
        .querySelector(".gigs-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function openMyGigs() {

    alert(
        "MY GIGS\n\n" +
        "Applied\n" +
        "Accepted\n" +
        "In Progress\n" +
        "Completed"
    );

}


function openEarnings() {

    alert(
        "EARNINGS\n\n" +
        "Today's earnings: ₹1,250\n" +
        "Pending: ₹600\n" +
        "Available: ₹4,850"
    );

}


function openProfile() {

    alert(
        "WORKER PROFILE\n\n" +
        "Your profile, skills, " +
        "availability, documents and " +
        "payment details will appear here."
    );

}


function openNotifications() {

    alert(
        "NOTIFICATIONS\n\n" +
        "You have 3 new gig opportunities."
    );

}