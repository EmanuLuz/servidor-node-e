const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
const port = 3000;

// Use o cors
app.use(cors());

// Middleware para o Express enternder JSON no corpo da requisição (req.body)
app.use(express.json());


// 1. Configura a conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
    password: '',
    database: 'multilingua'
});

// Conecta ao banco de dados
connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL: ', err.stack );
      return;
    }
    console.log('Conectado ao MySQL com sucesso!');

    // Cria a tabela 'alunos'  caso ela não exista
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS alunos(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL
      )`;
      connection.query( createTableQuery, (err) => {
        if (err) {
          console.error('Erro ao criar tabela: ', err.stack );
          return;
        }
      } );

    // Cria a tabela 'idioma_preferido' caso ela não exista
    const createTableidiomaQuery = `
        CREATE TABLE IF NOT EXISTS alunos(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        idioma_preferido VARCHAR(10) DEFAULT 'pt'
        )`;

        connection.query(createTableidiomaQuery, (err) => {
        if (err) {
        console.error('Erro ao criar tabela: ', err.stack);
        return;            
        }
    });
});

app.get('/alunos', (req, res) => {
  connection.query('SELECT * FROM alunos', (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar alunos'});
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});


//------ teste do projeto ------

// Cria a tabela 'idioma_preferido' caso ela não exista
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS alunos(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(255) NOT NULL,
//     idioma_preferido VARCHAR(10) DEFAULT 'pt'
//   )`;

// connection.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Erro ao criar tabela: ', err.stack);
//     return;
//   }
// });

// const translate = require('@vitalets/google-translate-api');

// // Rota para tradução instantânea de frases e conversas
// app.post('/traduzir', async (req, res) => {
//   const { texto, idiomaOrigem, idiomaDestino } = req.body;

//   if (!texto || !idiomaDestino) {
//     return res.status(400).json({ erro: 'Texto e idioma de destino são obrigatórios' });
//   }

//   try {
//     const resultado = await translate(texto, {
//       from: idiomaOrigem || 'auto', // 'auto' detecta o idioma automaticamente
//       to: idiomaDestino
//     });

//     res.json({
//       textoOriginal: texto,
//       textoTraduzido: resultado.text,
//       idiomaDetectado: resultado.from.language.iso
//     });
//   } catch (err) {
//     console.error('Erro na tradução: ', err);
//     return res.status(500).json({ erro: 'Erro ao processar a tradução' });
//   }
// });