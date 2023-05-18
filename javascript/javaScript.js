const products = JSON.parse(localStorage.getItem("productos")) || [];
const form = document.getElementById("form");
const table = document.getElementById("tabla");

const cargarTablaInicial = () => {
  products.forEach((producto) => insertarFila(producto));
};

const agregarProducto = (producto) => {
  products.push(producto);
  localStorage.setItem("productos", JSON.stringify(products));
};

const insertarFila = (producto) => {
  const row = document.createElement("tr");
  let td;
  td = document.createElement("td");
  td.textContent = producto.id;
  row.appendChild(td);

  td = document.createElement("td");
  td.textContent = producto.name;
  row.appendChild(td);

  td = document.createElement("td");
  td.textContent = producto.tipo;
  row.appendChild(td);

  td = document.createElement("td");
  td.textContent = producto.cantidad;
  row.appendChild(td);

  td = document.createElement("td");
  td.textContent = producto.valor;
  row.appendChild(td);

  td = document.createElement("td");
  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-danger";
  btnEliminar.innerText = "Eliminar";

  btnEliminar.onclick = () => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras recuperarlo",
      icon: 'Atencion!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = products.indexOf(producto);
        table.deleteRow(index + 1);
        products.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(products));
        Swal.fire(
          'Eliminado!',
          'Su producto a sido borrado...',
          'success'
        )
      }
    })
  };

  td.appendChild(btnEliminar);
  row.appendChild(td);

  table.appendChild(row);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = event.target.id.value;
  const name = event.target.name.value;
  const tipo = event.target.tipo.value;
  const valor = event.target.valor.value;
  const cantidad = event.target.cantidad.value;

  const producto = { id, name, tipo, valor, cantidad };

  insertarFila(producto);
  agregarProducto(producto);
});

cargarTablaInicial();

function cargarComment(comment) {
  const contenedorComments = document.getElementById("contenedorComentarios");
  const commentDiv = document.createElement("div");
  commentDiv.innerHTML = comment.body;
  contenedorComments.appendChild(commentDiv);
}

async function cargarReseñas() {
  const cargandoElement = document.getElementById("index__p__animacion");
  cargandoElement.innerHTML = "Cargando las reseñas Mi King bello UwU <3"
  const response = await fetch("https://dummyjson.com/comments?limit=3", {
    method: "GET",
  })
  const json = await response.json(); 
  cargandoElement.innerHTML = ""
  json.comments.forEach((comment) => cargarComment(comment));
}
/*     .then((response) => response.json())
    .then((data) => {

    });
} */

cargarReseñas();
