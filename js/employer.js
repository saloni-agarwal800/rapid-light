function postNewGig() {
    alert("Post Gig screen will open next.");
}


function viewAllGigs() {
    alert("My Gigs screen will open next.");
}


function viewActiveGig() {
    alert("Active Gig Details");
}


function contactWorker() {
    alert("Worker chat will open here.");
}


function viewGigDetails() {
    alert("Gig Details");
}


function manageApplicants() {
    alert("Applicant Management");
}


function viewApplications() {
    alert("All Applications");
}


function reviewApplicant(workerName) {

    alert(
        "Review Applicant\n\n" +
        workerName
    );
}


function findWorkers() {
    alert("Find Workers");
}


function openMessages() {
    alert("Messages");
}


function openEmployerProfile() {
    alert("Employer Profile");
}


function showNotifications() {
    alert("No new notifications.");
}


function goHome() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showAllCategories() {

    document
        .getElementById("categoryModal")
        .classList.add("show");
}


function closeCategories() {

    document
        .getElementById("categoryModal")
        .classList.remove("show");
}


function selectCategory(category) {

    closeCategories();

    alert(
        "Selected category:\n\n" +
        category +
        "\n\nPost Gig screen will open next."
    );
}