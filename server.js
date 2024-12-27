require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Importar el paquete CORS
const multer = require('multer');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Configuración de Multer para manejar archivos
const upload = multer({ storage: multer.memoryStorage() });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true',
  },
};

app.post('/upload', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No se ha enviado ninguna imagen' });
    }

    const pool = await sql.connect(dbConfig);
    const query = `
      INSERT INTO Imagenes (nombre, imagen)
      VALUES (@nombre, @imagen)
    `;
    await pool.request()
      .input('nombre', sql.NVarChar, req.body.nombre)
      .input('imagen', sql.VarBinary, req.file.buffer)
      .query(query);

    res.send({ message: 'Imagen guardada con éxito' });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).send({ message: 'Error al subir la imagen', error: error.message });
  }
});

app.get('/imagen/:id', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const query = `
      SELECT nombre, imagen
      FROM Imagenes
      WHERE id = @id
    `;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query(query);

    if (result.recordset.length > 0) {
      const imagen = result.recordset[0].imagen;
      res.contentType('image/png'); // Cambiar MIME según el formato de imagen
      res.send(imagen);
    } else {
      res.status(404).send({ message: 'Imagen no encontrada' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.put('/upload/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const imagen = req.file ? req.file.buffer : null; // Si se proporciona una nueva imagen, se actualiza

    const pool = await sql.connect(dbConfig);
    const query = `
      UPDATE Imagenes
      SET nombre = @nombre, 
          imagen = @imagen
      WHERE id = @id
    `;

    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('imagen', sql.VarBinary, imagen)
      .query(query);

    res.send({ message: 'Imagen actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    res.status(500).send({ message: 'Error al actualizar la imagen', error: error.message });
  }
});

app.delete('/imagen/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await sql.connect(dbConfig);
    const query = `
      DELETE FROM Imagenes
      WHERE id = @id
    `;

    await pool.request()
      .input('id', sql.Int, id)
      .query(query);

    res.send({ message: 'Imagen eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    res.status(500).send({ message: 'Error al eliminar la imagen', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;  // Cambiar el puerto a 5000 si no lo habías hecho
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
