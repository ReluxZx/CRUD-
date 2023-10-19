import datos from "../data/data.json" assert { type: "json" };
export const cargaDatoos=() => {
    const basedatos=JSON.parse(localStorage.getItem('datos'));
    if  (!basedatos){
        localStorage.setItem('datos',JSON.stringify(datos));
    }
}