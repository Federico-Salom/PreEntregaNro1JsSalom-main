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
    const index = products.indexOf(producto);
    table.deleteRow(index + 1);
    products.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(products));
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

  console.log(producto);
  insertarFila(producto);
  agregarProducto(producto);
});

cargarTablaInicial();
