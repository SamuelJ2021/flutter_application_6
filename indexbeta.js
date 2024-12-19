const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware pour parser le body des requêtes en JSON
app.use(bodyParser.json());

// Configuration de la connexion à MySQL
const db = mysql.createConnection({
  host: '10.51.4.100', // Remplacez par l'IP de votre serveur MySQL
  user: 'test',         // Nom d'utilisateur de la base de données
  password: 'test',     // Mot de passe de la base de données
  database: 'jo',            // Nom de la base de données
  connectTimeout: 30000
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
  f('nation', ('nom', 'continent'), values=('?', '?'));
});

// Généralisation pour réutiliser pour plusieurs tables
function f(table, keys, values){
  app.get('/'+table, (req, res) => {
    const sql = 'SELECT * FROM '+ table;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  app.post('/'+table, (req, res) => {
    //const { nom, continent } = req.body;
    const sql = 'INSERT INTO ' + table + ' ' + keys + 'VALUES('+String(...values)+')';
    console.log(sql);
    db.query(sql, req.body, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: result.insertId, ...req.body });
    });
  });
};

app.listen(port, () => {
  console.log(`Serveur API en écoute sur http://localhost:${port}`);
});

//f('sport', ('nom'), values=('?'));