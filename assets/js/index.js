let productosCarro = [];

if (localStorage.getItem("productos")) {
  productosCarro = JSON.parse(localStorage.getItem("productos")) || [];
  actualizarCarro(productosCarro);
}
cargarProductos(productos);

//FUNCION ENCARGADA DE CARGAR PRODUCTOS

function cargarProductos(listadoProductos) {
  let acumulador = "";
  listadoProductos.forEach((producto) => {
    let template = `
                    <div class="col-12 col-md-6 col-lg-3">
                      <div class="card m-auto my-2" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                          <h5 class="card-title">"${producto.nombre}"</h5>
                          <p class="card-text">"${producto.dscripcion}"</p>
                          <p class="card-text">Precio: "${producto.precio}"</p>
                          <button class="btn btn-primary" data-sku=${producto.sku} onclick="addToCart('${producto.sku}')">Comprar</button>
                        </div>
                      </div>
                    </div>
                      
                          `;
    acumulador += template;
  });

  document.querySelector("#productos .row").innerHTML = acumulador;
}

function addToCart(sku) {
  let objProducto = {
    sku,
    cantidad: 1,
  };

  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
    /* Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto agregado correctamente.",
      showConfirmButton: false,
      timer: 1500,
    }); */
    alert("Producto agregago correctamente.")
  } else {
    productosCarro.push(objProducto);
  }

  actualizarCarro(productosCarro);
}

function actualizarCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(listadoProductos));

  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (accumulator, producto) => accumulator + producto.cantidad,
    valorInicial
  );

  /* document.querySelector("#cantidad-productos").innerText = sumaProductos; */
}
