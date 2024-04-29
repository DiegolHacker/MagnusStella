const ZecoreSaleHelper = require("../models/zecoresaleshelper.model");
const ZecoreProductHelper = require("../models/zecoreproducthelper.model");

exports.validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // validar token
  if (!token || token !== process.env.API_KEY) {
    return res.status(403).json({ message: "Acceso no autorizado." });
  }
  // token ok, seguir
  next();
};
exports.post_ModifyProduct = (request, response, next) => {
  const MP = request.body;
  const ModifyProduct = new ZecoreProductHelper();
  ModifyProduct.ModificarProducto(MP.idProducto, MP.Columna, MP.NuevoValor)
    .then(() => {
      return response
        .status(200)
        .json({ message: "Hemos recibido la información" });
    })
    .catch((error) => {
      console.log("Error al recibir la información: " + error);
      return response
        .status(500)
        .json({ message: "Error al recibir la información: " + error });
    });
};

exports.post_NewProduct = (request, response, next) => {
  const data = request.body;
  const { idProducto, marcaProducto, Nombre, Image, Descripcion, categoria } =
    data;
  const NEWproduct = new ZecoreProductHelper(
    idProducto,
    marcaProducto,
    Nombre,
    Image,
    Descripcion,
    categoria
  );
  NEWproduct.RegistrarProducto()
    .then(() => {
      return response
        .status(200)
        .json({ message: "Hemos recibido la información" });
    })
    .catch((error) => {
      console.log("Error al recibir la información " + error);
      return response
        .status(500)
        .json({ message: "Error al recibir la información " + error });
    });
};

exports.post_venta = (request, response, next) => {
  const data = request.body;
  const { Cliente, Producto_id, Fecha, SalesON } = data;
  const venta = new ZecoreSaleHelper(Cliente, Producto_id, Fecha, SalesON);
  console.log(venta);
  venta
    .RegistrarVenta()
    .then(() => {
      return response.status(200).json({
        message: "Hemos recibido la información",
      });
    })
    .catch((error) => {
      console.log("Error al recibir la información " + error);
      return response
        .status(500)
        .json({ message: "Error al recibir la información" });
    });

  //incluir lo de correos
};
