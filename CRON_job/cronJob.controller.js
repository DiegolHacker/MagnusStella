const cron = require("node-cron");
const model = require("./cronJob.model");
const controller = require("../controllers/resenas.controller");

module.exports = cron.schedule("*/2 * * * *", () => {
  model
    .getVentasTime()
    .then(([mailInfo, fieldData]) => {
      if (mailInfo.length > 0) {
        console.log("Sending emails...");

        function delay(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        (async () => {
          for (let info of mailInfo) {
            controller.enviar_resenia(
              info.idMarca,
              info.nombreProducto,
              info.nombre,
              info.idVenta,
              info.mail
            );

            await delay(2000);
          }
          console.log("Emails sent!");
        })();
      } else {
        console.log("No hay correos por enviar hoy");
      }
    })
    .catch((error) => {
      console.log("Error recuperando las ventas", error);
    });
});
