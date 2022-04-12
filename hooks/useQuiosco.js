import { useContext } from "react";
import QuiscoContext from "../context/QuioscoProvider";

function useQuiosco() {
  return useContext(QuiscoContext);
}

export default useQuiosco;
