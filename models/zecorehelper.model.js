const db = require('../util/database')

module.exports = class ZecoreHelper{
    constructor(Cliente_nom,Producto_id,Fecha,SalesOrdernum){
        this.Cliente_nom = Cliente_nom;
        this.Producto_id = Producto_id;
        this.Fecha = Fecha;
        this.SalesOrdernum = SalesOrdernum;
    }

    async RegistrarVenta(Cliente_nom,Producto_id,Fecha,SalesOrdernum){
        try{
            const result = await db.execute('insert into venta (idVenta, Fk_Venta_Cliente, Fk_Venta_Producto, Fecha, SalesOrderNum) values (default, ?, ?, ?, ?)',
        [Cliente_nom,Producto_id,Fecha,SalesOrdernum]);
        console.log('información guardada con éxito')
        } catch (error){
            console.error('Error en el guardado de datos: ', error)
        }

    }
}