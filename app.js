const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deenis711@gmail.com',
    pass: 'KrzepkiRay2012'
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'destination_email@example.com',
    subject: 'Nowe zgłoszenie',
    text: `Imię i nazwisko: ${name}\nEmail: ${email}\nWiadomość: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Wystąpił błąd podczas wysyłania maila.' });
    }

    res.status(200).json({ message: 'Zgłoszenie zostało wysłane pomyślnie.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
