const db = require('../util/database');

module.exports = class Respuesta{
    constructor(idReview, Descripcion, idpregunta){
        this.idReview = idReview;
        this.Descripcion = Descripcion;
        this.idpregunta = idpregunta;
    }
//posible error, si las respuestas sí se regresan como un array, tenemos que utilizar un for o alguna otra estructura
    async save(){
        console.log(this.idReview, this.Descripcion, this.idpregunta);
        console.log('Registrando respuesta...');
        try {
            const result = await db.execute(
                'INSERT INTO Respuesta (idReview, Descripcion, idpregunta) VALUES (?, ?, ?)',
                [this.idReview, this.Descripcion, this.idpregunta]
            );
            console.log('Se registraron las respuestas');
            return result;
        } catch (error) {
            console.log('Error al registrar respuesta: '+error)
        }

    }
}