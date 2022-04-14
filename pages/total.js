import { useEffect, useCallback } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total</h1>
      <p className="text-2xl my-10">Confirma tu pedido a Continuacion</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            className="block uppercase text-slate-800 font-bold text-xl"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="bg-gray-200 w-full lg:w-1/3 p-2 rounded-md outline-none mt-2"
            placeholder="Ej. Alberto Pimentel"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar:{" "}
            <span className="font-bold text-green-700">
              {formatearDinero(total)}
            </span>
          </p>
        </div>

        <div className="mt-5">
          <input
            disabled={comprobarPedido()}
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100 cursor-not-allowed"
                : "bg-indigo-600 cursor-pointer hover:bg-indigo-700"
            } w-full text-center lg:w-auto px-5 py-2 rounded uppercase font-bold text-white outline-none `}
            value="Confirmar Pedido"
          />
        </div>
      </form>
    </Layout>
  );
}
