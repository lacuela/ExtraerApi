const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ada4feff0amshaf02fc78c91e03dp100f75jsnf9f00c5856ac',
    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
  },
};

let tipo = "";
let idioma = "";
let barra = "";

let categorias = [];

function cogerTipos() {
  ponerElementos();
  fetch("https://v2.jokeapi.dev/joke" + barra + tipo + idioma, options)
    .then(response => response.json())
    .then(response => {
      let jokeText;
      if (response.type === "single") {
        jokeText = response.joke;
      } else {
        jokeText = response.setup + " " + response.delivery;
      }

      // Verificar si el chiste es válido
      if (jokeText === undefined || jokeText === "undefined undefined") {
        obtenerChiste(); // Llamada recursiva
      } else {
        const bromas = document.getElementById("bromas");
        bromas.innerHTML = ""; // Limpiar el contenido anterior si lo hay
        const p = document.createElement("p");
        p.textContent = jokeText;
        bromas.appendChild(p);
        bromas.style.display = "block";
        document.getElementById("loading").style.display = "none";
      }
    })
    .catch(err => console.error(err));
}

function cambiarIdioma(nuevoIdioma) {
  idioma = "?lang=" + nuevoIdioma;
  obtenerChiste();
}

function ponerElementos() {
  let numeroAleatorio = Math.floor(Math.random() * categorias.length);
  tipo = categorias[numeroAleatorio];
  barra = "/"
}

function obtenerChiste() {
  document.getElementById("loading").style.display = "block";
  ponerElementos();
  fetch("https://v2.jokeapi.dev/categories", options)
    .then(response => response.json())
    .then(data => {
      categorias = data.categories;
      cogerTipos();
    })
    .catch(error => console.error(error));
}