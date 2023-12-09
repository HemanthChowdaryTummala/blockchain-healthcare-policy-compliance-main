const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('TreatmentTeamSample.db');
app.use(cors());
app.get('/patients/:id', (req, res) => {
  const patientId = req.params.id;
  db.get('SELECT * FROM patients WHERE patient_id = ?', [patientId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  });
});

app.get('/treatment-team/:id', (req, res) => {
    const teamId = req.params.id;
    db.get('SELECT * FROM TreatmentTeam WHERE Patient = ?', [teamId], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Treatment team not found' });
      }
    });
  });

app.get('/health-records', (req, res) => {
    db.all('SELECT * FROM Health_Records', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
});
app.get('/informed-consent/:patient', (req, res) => {
    const patient = req.params.patient;
    db.all('SELECT * FROM InformedConsent where ObjectId = ?', [patient] ,(err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
});
app.get('/image/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    db.get('SELECT image_data FROM Image WHERE id = ?', [imageId], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (row) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(row.image_data, 'binary');
      } else {
        res.status(404).send('Image not found');
      }
    });
});

app.get('/provider-data/:PR1/:PR2/:PR3/:PR4/:PR5/:PR6/:I1/:E1/:P1', (req, res) => {
  const { PR1, PR2, PR3, PR4, PR5, PR6, I1, E1, P1 } = req.params;

  // Create queries for each table
  const providerQuery = 'SELECT name FROM provider WHERE provider_id IN (?, ?, ?, ?, ?, ?)';
  const I1Query = 'SELECT Name FROM InsuranceAgent WHERE ID = ?';
  const E1Query = 'SELECT name FROM emergencyContact WHERE contact_id = ?';
  const P1Query = 'SELECT Name FROM Pharmacist WHERE ID = ?';

  const providerParams = [PR1, PR2, PR3, PR4, PR5, PR6];
  const I1Param = I1;
  const E1Param = E1;
  const P1Param = P1;

  const responseData = {};

  // Execute the queries
  db.all(providerQuery, providerParams, (providerErr, providerRows) => {
    if (providerErr) {
      console.error(providerErr);
      return res.status(500).send('Internal Server Error');
    }

    if (providerRows.length > 0) {
      responseData.providerNames = providerRows.map((row) => row.name);
    } else {
      responseData.providerNames = [];
    }

    db.get(I1Query, [I1Param], (I1Err, I1Row) => {
      if (I1Err) {
        console.error(I1Err);
        return res.status(500).send('Internal Server Error');
      }
      I1Data = I1Row ? I1Row.Name : null;
      responseData.providerNames.push(I1Data);
      db.get(E1Query, [E1Param], (E1Err, E1Row) => {
        if (E1Err) {
          console.error(E1Err);
          return res.status(500).send('Internal Server Error');
        }
        E1Data = E1Row ? E1Row.name : null;
        responseData.providerNames.push(E1Data);

        db.get(P1Query, [P1Param], (P1Err, P1Row) => {
          if (P1Err) {
            console.error(P1Err);
            return res.status(500).send('Internal Server Error');
          }
          P1Data = P1Row ? P1Row.Name : null;
          responseData.providerNames.push(P1Data);
          res.json(responseData);
        });
      });
    });
  });
});

app.post('/check-login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Both username and password are required.' });
    }
    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (row) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});
app.post('/confirm-consents', (req, res) => {
  const receivedData = req.body;
  db.run(
    'CREATE TABLE IF NOT EXISTS final_consents (Patient Text,Subject TEXT, Action TEXT, Object TEXT)',
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const insertStatement = db.prepare('INSERT INTO final_consents (Patient,Subject, Action, Object) VALUES (?, ?, ?, ?)');
      for (const consentElement of receivedData.consentsList) {
        insertStatement.run(receivedData.patient, consentElement.Subject, consentElement.Action, consentElement.Object, (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
        });
      }
      insertStatement.finalize();
      res.json({ message: 'Consent data inserted successfully' });
    }
  );
});
app.get('/final-consents/:id', (req, res) => {
  const subjectID = req.params.id;
    db.get('SELECT * FROM final_consents WHERE Subject = ?', [subjectID], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  });
});

app.post('/query', (req, res) => {
  const query  = req.body.query;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: rows });
    }
  });
});

app.get('/contracts/:patient', (req, res) => {
  const patient = req.params.patient;
  const sql = 'SELECT contract FROM contracts WHERE patient = ?';
  db.get(sql, [patient], (err, row) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
      } else if (row) {
          res.json({ contract: row.contract });
      } else {
          res.status(404).json({ error: 'Patient not found' });
      }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
