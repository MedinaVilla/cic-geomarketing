const express = require("express");
const { Connection } = require("../postgres");
const router = express.Router();

router.get("/negocios", async (req, res) => {
  Connection.db.query(`SELECT * FROM public.negocios where "codigo_act"='621511'`)
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})
router.get("/negocios/graph1", async (req, res) => {
  Connection.db.query('SELECT * FROM negocios_Municipio') // Vista
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})

router.get("/negocios/graph2", async (req, res) => {
  Connection.db.query('SELECT * FROM clinicas_municipio') // Vista
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})

router.get("/negocios/graph3", async (req, res) => {
  Connection.db.query('SELECT * FROM categorias') // Vista
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})

module.exports = router;