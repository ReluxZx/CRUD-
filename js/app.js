import datos from "../data" assert {type: json};
import { Gift } from "./clases.js";

const bodyTable = document.querySelector("#BodyTable");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

let idGiftUpdate = null;

 window.mostrarModal = (id) =>{ 
    console.log(id);
    idGiftUpdate = id;

    let index = datos.findIndex((item) => item.id == idGiftUpdate);
    
    document.querySelector("#giftModal").value = [index].gift;
    document.querySelector("#tipoModal").value = [index].tipo;
    document.querySelector("#tiempoModal").value = [index].tiempo;
    document.querySelector("#precioModal").value = [index].precio;
    document.querySelector("#imagempoModal").value = [index].imagen;
    myModal.show();
    
   };

   const idGiftUpdate = (e) => {
      e.preventDefault();
      let index = datos.findIndex((item) => item.id == idGiftUpdate);
      datos[index].gift = document.querySelector("giftModal").value;
      datos[index].tipo = document.querySelector("tipoModal").value;
      datos[index].tiempo = document.querySelector("tiempoModal").value;
      datos[index].precio = document.querySelector("precioModal").value;
      datos[index].imagen = document.querySelector("imagenModal").value;
       
      cargarTabla();
      myModal.hide();
   };

   
