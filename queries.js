const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.7',
  database: 'asistencia',
  password: 'jo3l.2018',
  port: 5432,
})

const getUserById = (request, response) => {
  const cedula = request.body

  pool.query('SELECT * FROM usuarios WHERE cedula = $1', [cedula], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { nombre, cedula, fecha } = request.body

  pool.query('INSERT INTO marcacion (nombre, cedula, fecha) VALUES ($1, $2, $3)', [nombre, cedula , fecha], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Registro de Marcacion: ${result.insertId}`)
  })
}



module.exports = {
  getUserById,
  createUser,
}