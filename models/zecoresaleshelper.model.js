const db = require("../util/database");

module.exports = class ZecoreSalesHelper {
  constructor(Cliente_nom, Producto_id, Fecha, SalesOrdernum) {
    this.Cliente_nom = Cliente_nom;
    this.Producto_id = Producto_id;
    this.Fecha = Fecha;
    this.SalesOrdernum = SalesOrdernum;
  }

  async RegistrarVenta() {
    console.log("Registrando venta...");
    try {
      const result = await db.execute(
        "insert into venta (idVenta, Fk_Venta_Cliente, Fk_Venta_Producto, Fecha, SalesOrderNum) values (default, ?, ?, ?, ?)",
        [this.Cliente_nom, this.Producto_id, this.Fecha, this.SalesOrdernum]
      );
      console.log("Información guardada con éxito");
      return result;
    } catch (error) {
      console.error("Error en el guardado de datos: ", error);
    }
  }
};
