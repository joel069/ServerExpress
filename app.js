const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const fileUpload = require('express-fileupload') 
const fs = require('fs')
app.use(fileUpload());
const db = require('./queries')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.7',
  database: 'asistencia',
  password: 'jo3l.2018',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})



app.post('/sendUpload', (req,res) => {
    let myfile;
    let youpath;

    myfile = req.files.formUpload
    youpath = __dirname + '/files/' + myfile.name;

    myfile.mv(youpath,(err) => {
        if (err){
            console.log(err);
        }
        res.send("file sucess to Upload").status(201);
        console.log("Location" + req.protocol + "://" + req.url + "/" + myfile.name);
    })

})

app.get("/users/:cedula?",async function (req, res){
  const cedula =  req.query.cedula;
  console.log(cedula);
  pool.query('SELECT * FROM usuarios WHERE cedula = $1', [cedula], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
    console.log(results.rows);
  })

});

app.get("/listar/:cedula?",async function (req, res){
  const cedula =  req.query.cedula;
  console.log(cedula);
  pool.query('SELECT * FROM marcacion WHERE cedula = $1', [cedula], (error, results1) => {
    if (error) {
      throw error
    }
    res.status(200).json(results1.rows)
    console.log(results1.rows);
  })

});

app.post("/marcacion/:cedula?:nombre?:fecha?",async function (req, res){
  const cedula =  req.query.cedula;
  const nombre =  req.query.nombre;
  const fecha =  req.query.fecha;
  pool.query('INSERT INTO marcacion (nombre, cedula, fecha) VALUES ($1, $2, $3)', [nombre, cedula , fecha], (error, resultado) => {
    if (error) {
      throw error
    }
    res.status(201).send('Registro de Marcacion: ${resultado.insertId}')
  })
});



app.post("/sendVoices/:cedula?",async function (req, res)  {
    let myfile;
    let youpath;
    const cedula =  req.body.cedula;
    console.log(cedula)
    if (fs.existsSync(cedula)) {
      myfile = req.files.formUpload;
      youpath = __dirname + "/" + cedula + "/" + myfile.name;
      console.log("EXISTE Y GURADA");
      res.send("file sucess to Upload").status(201);
    } else {
      fs.mkdirSync(cedula);
      myfile = req.files.formUpload;
      youpath = __dirname + "/" + cedula + "/" + myfile.name;
      console.log("EXISTE2222 Y GURADA");
      res.send("file sucess to Upload").status(201);
    }
    myfile.mv(youpath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });


app.listen(3000, ()=>{
console.log("Server runing in port ",3000);

});