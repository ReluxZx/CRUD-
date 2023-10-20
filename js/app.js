
import { Gift } from "./clases.js";
import { cargaDatoos } from "./funcion.js";
let datos=[]

const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

let idGiftUpdate = null;

window.mostrarModal = (id) => {
    console.log(id);
    idGiftUpdate = id;
    let index = datos.findIndex((item) => item.id == idGiftUpdate);

    document.querySelector("#giftModal").value = datos[index].gift;
    document.querySelector("#tipoModal").value = datos[index].tipo;
    document.querySelector("#tiempoModal").value = datos[index].tiempo;
    document.querySelector("#precioModal").value = datos[index].precio;
    document.querySelector("#imagenModal").value = datos[index].imagen;
    document.querySelector("#fechaModal").value = datos[index].fecha;

    myModal.show();
};



const giftUpdate = (e) => {
    e.preventDefault();

    const gift = document.querySelector("#giftModal").value;
    const tipo = document.querySelector("#tipoModal").value;
    const tiempo = document.querySelector("#tiempoModal").value;
    const precio = document.querySelector("#precioModal").value;
    const imagen = document.querySelector("#imagenModal").value;
    const fecha = document.querySelector("#fechaModal").value;

    if (gift === "") {
        alert("El campo `Gift` es obligatorio.");
        return;
    }

    if (tipo === "") {
        alert("El campo `Tipo` es obligatorio.");
        return;
    }

    if (tiempo === "") {
        alert("El campo `Tiempo` es obligatorio.");
        return;
    }

    if (precio === "") {
        alert("El campo `Precio` es obligatorio.");
        return;
    }

    if (imagen === "") {
        alert("El campo `Imagen` es obligatorio.");
        return;
    }

    if (fecha === "") {
        alert("El campo `Fecha` es obligatorio.");
        return;
    }

   

    let index = datos.findIndex((item) => item.id == idGiftUpdate);

    datos[index].gift = gift;
    datos[index].tipo = tipo;
    datos[index].tiempo = tiempo;
    datos[index].precio = precio;
    datos[index].imagen = imagen;
    datos[index].fecha = fecha;

    localStorage.setItem("datos", JSON.stringify(datos));
    cargarTabla();
    myModal.hide();

    console.log("El formulario se envió correctamente");
};


const cargarTabla = async () => {
    datos=JSON.parse(localStorage.getItem('datos'))
    cuerpoTabla.innerHTML = "";
    datos.map((item) => {
        const fila = document.createElement("tr");

        const celdas = `<th>${item.gift}</th>
            <td>${item.tipo}</td>
            <td>${item.tiempo}</td>
            <td>${item.precio}</td>
            <td>${item.fecha}</td>
            <td><img src="${item.imagen}" alt="${item.gift}" width="40" height="60"></td>
            <td>
            <div class="d-flex gap-2">
            <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" onclick="borrarGift(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
            </td>
            `;

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);
        

    });
};

const agregarGift = async (event) => {
    event.preventDefault();

    let id = datos.at(-1).id + 1;
    let gift = document.querySelector("#gift").value;
    let tipo = document.querySelector("#tipo").value;
    let tiempo = document.querySelector("#tiempo").value;
    let precio = document.querySelector("#precio").value;
    let imagen = document.querySelector("#imagen").value;
    let fecha = document.querySelector("#fecha").value;

    datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen, fecha));
    document.querySelector("#formGift").reset();
    localStorage.setItem("datos", JSON.stringify(datos));
    cargarTabla();
};

window.borrarGift = (id) => {
    let index = datos.findIndex((item) => item.id == id);

    let validar = confirm(
        `Está seguro/a que quiere eliminar la gift card ${datos[index].gift}?`
    );

    if (validar) {
        datos.splice(index, 1);
        localStorage.setItem('datos', JSON.stringify(datos));
        cargarTabla();
    }
};
cargaDatoos();
cargarTabla();

document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector("#formModal").addEventListener("submit", giftUpdate);