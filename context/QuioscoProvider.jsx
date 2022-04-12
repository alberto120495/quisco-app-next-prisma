import { useState, useEffect, createContext } from "react";

const QuiscoContext = createContext();

function QuioscoProvider({ children }) {
  return <QuiscoContext.Provider value={{}}>{children}</QuiscoContext.Provider>;
}

export { QuioscoProvider };
export default QuiscoContext;
