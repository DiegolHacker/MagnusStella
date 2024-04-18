const ZecoreHelper = require('../models/zecorehelper.model');
const zh = require('../models/zecorehelper.model')


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

const validateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    // validar token
    if (!token || token !== 'Prueba') {
        return res.status(403).json({ message: "Acceso no autorizado." });
    }
    // token ok, seguir
    next();
};


exports.post_venta = (request, response, next) =>{
    console.log('gg')
  validateToken;
  const data = request.body;
  const { Cliente, Producto_id, Fecha, SalesON } = data;
  const venta = new ZecoreHelper(Cliente, Producto_id, Fecha, SalesON);
  console.log(venta)
  console.log('gg2')

  venta.RegistrarVenta()
        .then(() => {
            console.log('gg3')
            return response
            .status(200)
            .json({
                message: "Hemos recibido la información",
            });
        })
        .catch((error) => {
            console.log("Error al recibir la información " + error);
            return response
            .status(500)
            .json({message: "Error al recibir la información" });
        });

        //incluir lo de correos
    }
