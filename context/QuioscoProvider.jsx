import axios from "axios";
import { useState, useEffect, createContext } from "react";

const QuiscoContext = createContext();

function QuioscoProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);

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

  return (
    <QuiscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        handleSetProducto,
        modal,
        handleChangeModal,
      }}
    >
      {children}
    </QuiscoContext.Provider>
  );
}

export { QuioscoProvider };
export default QuiscoContext;
