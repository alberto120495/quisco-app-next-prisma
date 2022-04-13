import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const QuiscoContext = createContext();

function QuioscoProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);

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

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, imagen, ...producto }) => {
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
      }}
    >
      {children}
    </QuiscoContext.Provider>
  );
}

export { QuioscoProvider };
export default QuiscoContext;
