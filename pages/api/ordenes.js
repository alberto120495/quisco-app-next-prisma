import { PrismaClient } from "@prisma/client";

async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const orden = await prisma.order.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    });
    res.json(orden);
  }
}

export default handler;
