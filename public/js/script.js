const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  sidebar = body.querySelector(".side_bar"),
  toggle = body.querySelector(".toggle"),
  siderbarClose = document.querySelector(".siderbarClose"),
  main_content = document.querySelector(".main-content"),
  footer = document.querySelector(".footer-1"),
  Brand = document.querySelectorAll(".select-brand"),
  BrandLogos = document.querySelectorAll(".brand-logo"),
  DefaultBrand = document.querySelector(".default-brand");

//cositas para el moda
let modal = document.getElementById("myModal");

let modalActive = document.getElementById("myModal-active");

// Get the button that opens the modal

let btn = document.getElementById("openModalBtn");

//get the button that opens modal of active filters
let btn_active = document.getElementById("openModalBtn-active");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];


//este pedazo de codigo hace que el toggle funcione y habra el menu
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  main_content.classList.toggle(
    "main-content-increase",
    !sidebar.classList.contains("close")
  );
  footer.classList.toggle(
    "footer-margin-increase",
    !sidebar.classList.contains("close")
  );
});

let getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");

  // js code to keep user selected mode even page refresh or file reopen
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

toggle.addEventListener("click", () => {
  nav.classList.add("active");
});

body.addEventListener("click", (e) => {
  let clickedElm = e.target;

  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

//funcion de rating estrellas
const stars = document.querySelectorAll(".estrellas i");
stars.forEach((star, index1) => {
  console.log(stars);
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});
//codigo para cambiar de Tab en la sección de correos.
function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("Tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

//dashboard

let lineColor1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--line-color-1"
);
let lineColor2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--line-value-2"
);

const creaGraficaLinea = (grapN, x, y, titulo) => {
  let lineColor1 = getComputedStyle(document.documentElement).getPropertyValue(
    "--line-color-1"
  );
  new Chart(grapN, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: titulo,
          data: y,
          borderWidth: 1,
          borderColor: lineColor1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

//grafica promedio de puntaje
const meses = promedioMes.map((dato) => dato.mes);
const promedio = promedioMes.map((dato) => dato.promedio);
const graph1 = document.getElementById("promedioxMes");
const titulo = "Promedio de puntaje por mes";

creaGraficaLinea(graph1, meses, promedio, titulo);

// tasa de respuesta
const ctx = document.getElementById("tasaContestada");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Tasa de Respuesta", "Restante"],
    datasets: [
      {
        data: [tasaDeRespuesta, 100 - tasaDeRespuesta],
        backgroundColor: ["#2e3d50", "#D9D9D9"],
        hoverBackgroundColor: ["#2e3d50", "#D9D9D9"],
      },
    ],
  },
  options: {
    cutoutPercentage: 80,
  },
});

//respuestas enviadas
const enviadaMeses = respuestasEnviadas.map((dato) => dato.mes);
const enviadas = respuestasEnviadas.map((dato) => dato.enviadas);
const graph2 = document.getElementById("respuestaEnviada");
const titulo2 = "Encuestas enviadas por mes";

creaGraficaLinea(graph2, enviadaMeses, enviadas, titulo2, lineColor1);


btn.onclick = function () {
    modal.style.display = "block";
};

btn_active.onclick = function () {
  modalActive.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == modalActive) {
    modal.style.display = "none";
    modalActive.style.display = "none";
  }
};

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
    modalActive.style.display = "none";
  }
});

//función para agregar nuevo campo de entrada
function agregarCampoInput() {
  var container = document.getElementById("opciones-container");
  var button = document.getElementById("button_opcion");
  var counter = container.querySelectorAll("input").length + 1;

  var newInput = document.createElement("input");
  newInput.name = "op_" + counter;
  newInput.id = "op_" + counter;
  newInput.type = "text";
  newInput.classList.add("input");
  container.insertBefore(newInput, button);
}

document.getElementById("button_opcion").addEventListener("click", function () {
  agregarCampoInput();
});

function togglePassword() {
  var passwordInput = document.getElementById("password");
  var togglePasswordBtn = document.getElementById("togglePasswordBtn");
  var eyeIcon = togglePasswordBtn.querySelector("i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}
