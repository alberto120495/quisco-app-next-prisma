import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
function Producto({ producto }) {
  const { nombre, precio, imagen } = producto;
  const { handleSetProducto, handleChangeModal } = useQuiosco();
  return (
    <div className="border p-3">
      <Image
        className="w-full"
        src={`/assets/img/${imagen}.jpg`}
        width={400}
        height={500}
        alt={`Imagen platillo ${nombre}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="text-4xl mt-5 font-bold text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white mt-5 p-3 px-4 rounded uppercase font-bold "
          onClick={() => {
            handleChangeModal();
            handleSetProducto(producto);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Producto;
