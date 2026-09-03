/* =================================
   GIG DETAILS
================================= */

function goBack() {

    window.history.back();

}


/* =================================
   SHARE
================================= */

function shareGig() {

    if (navigator.share) {

        navigator.share({

            title: "House Cleaning Gig",

            text:
                "House Cleaning gig " +
                "on Rapid Light - ₹600"

        });

    } else {

        alert(
            "Share link copied!"
        );

    }

}


/* =================================
   MAP
================================= */

function openMap() {

    alert(
        "Map integration will open here.\n\n" +
        "Location: Ashok Nagar, Jaipur"
    );

}


/* =================================
   EMPLOYER
================================= */

function viewEmployer() {

    alert(
        "Employer Profile\n\n" +

        "HomeCare Services\n" +
        "⭐ 4.8\n" +
        "126 completed gigs\n\n" +

        "Full employer profile will " +
        "be available here."
    );

}


/* =================================
   APPLY
================================= */

function applyForGig() {

    const confirmation =
        confirm(
            "Apply for this gig?\n\n" +

            "House Cleaning\n" +
            "Payment: ₹600\n" +
            "Duration: 2 hours\n" +
            "Location: Ashok Nagar"
        );


    if (confirmation) {

        document
            .getElementById("successModal")
            .classList.add("show");

    }

}


/* =================================
   SUCCESS
================================= */

function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.remove("show");

}


function goToMyGigs() {

    window.location.href =
        "dashboard.html#my-gigs";

}