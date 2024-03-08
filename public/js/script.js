const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      userProfile = document.querySelector(".userProfile"),
      sidebar = body.querySelector(".side_bar"),
      toggle = body.querySelector(".toggle"),
      siderbarClose = document.querySelector(".siderbarClose"),
      main_content = document.querySelector(".main-content"),
      footer = document.querySelector(".footer-1");

//este pedazo de codigo hace que el toggle funcione y habra el menu
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    main_content.classList.toggle("main-content-increase", !sidebar.classList.contains("close"))
    footer.classList.toggle("footer-margin-increase", !sidebar.classList.contains("close"))

});


let getMode = localStorage.getItem("mode");

if(getMode && getMode === "dark-mode"){
    body.classList.add("dark");
}

// js code to toggle dark and light mode
      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        // js code to keep user selected mode even page refresh or file reopen
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });


userProfile.addEventListener("click" , () =>{
   userProfile.classList.toggle("active");
});
 

toggle.addEventListener("click" , () =>{
    nav.classList.add("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});

//funcion de rating estrellas
const stars = document.querySelectorAll(".estrellas i");
stars.forEach((star, index1) => {
  console.log(stars)
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
    });
  });
});
;

//codigo para cambiar de Tab en la sección de correos.
function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("Tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(tabName).style.display = "block";  
}