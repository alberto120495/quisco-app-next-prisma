import React from "react";
import Layout from "../layout/Layout";

export default function total() {
  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total</h1>
      <p className="text-2xl my-10">Confirma tu pedido a Continuacion</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"></div>
    </Layout>
  );
}
