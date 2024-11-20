const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://dataeditoruser:NTc5oiGjk8njV6f3@cluster0.ylzh9.mongodb.net/RedLocal?retryWrites=true&w=majority";

app.use(express.json());

app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
MongoClient.connect(uri)
  .then((client) => {
    console.log("Conectado a la base de datos");
    const db = client.db("RedLocal");
    const collection = db.collection("Entradas");
    app.post("/save-input", (req, res) => {
      const inputData = req.body.inputData;
      collection
        .insertOne({ user_name: inputData })
        .then((result) => {
          res.status(200).send("Datos guardados correctamente");
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error al guardar datos");
        });
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
