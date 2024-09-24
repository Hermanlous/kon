const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const SENDGRID_API_KEY = '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';

exports.sendRepairEmail = functions.firestore
  .document('repairs/{repairId}')
  .onCreate(async (snap, context) => {
    const repair = snap.data();

    if (!repair.email) {
      console.error('No email address found in repair document.');
      return;
    }

    const msg = {
      personalizations: [
        {
          to: [{ email: repair.email }],
          subject: 'Bekreftelse på ny reparasjon'
        }
      ],
      from: { email: 'ahlous@stud.ntnu.no' }, // Verifisert e-postadresse
      content: [
        {
          type: 'text/plain',
          value: `Hei,\n\nVi har mottatt din reparasjon.\n\nBeskrivelse: ${repair.description}\nType fiks: ${repair.fixType}\nDato: ${repair.date}\n\nTakk!\n`
        },
        {
          type: 'text/html',
          value: `<p>Hei,</p><p>Vi har mottatt din reparasjon.</p><p><strong>Beskrivelse:</strong> ${repair.description}</p><p><strong>Type fiks:</strong> ${repair.fixType}</p><p><strong>Dato:</strong> ${repair.date}</p><p>Takk!</p>`
        }
      ]
    };

    console.log('Forbereder å sende e-post med følgende detaljer:', msg);

    try {
      const response = await axios.post('https://api.sendgrid.com/v3/mail/send', msg, {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('E-post sendt, responsstatus:', response.status);
      console.log('Responsdata:', response.data);
    } catch (error) {
      console.error('Feil ved sending av e-post:', error.response ? error.response.data : error.message);
    }
  });