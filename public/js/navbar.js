function openNav() {
    document.getElementById("mySidenav").style.width = "100%"
    document.getElementById('backdrop').style.display = "block"
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
    document.getElementById('backdrop').style.display = "none"
}

window.addEventListener('click', function(e) {
    if (!document.getElementById('mySidenav').contains(e.target) && (!document.getElementById('mobile-nav-open-icon').contains(e.target))){
        closeNav()
  }
})