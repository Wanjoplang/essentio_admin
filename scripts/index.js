function loadPage(page){
    $("body").load(page);
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        loadPage("pages/home.html")
    } else {
        // No user is signed in.
        loadPage("pages/access.html")
    }
});