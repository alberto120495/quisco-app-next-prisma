import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const QuiscoContext = createContext();

function QuioscoProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );

    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualizar cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente", {
        autoClose: 1500,
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success(`${producto.nombre} agregado al pedido.`, {
        autoClose: 1500,
      });
    }
    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter(
      (productoState) => productoState.id === id
    );
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter(
      (productoState) => productoState.id !== id
    );
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();
    console.log("pedido");
    console.log(pedido);
    console.log(nombre);
  };

  return (
    <QuiscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        handleSetProducto,
        producto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuiscoContext.Provider>
  );
}

export { QuioscoProvider };
export default QuiscoContext;
