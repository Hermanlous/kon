import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();

const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendRepairEmail = functions.firestore
  .document('repairs/{repairId}')
  .onCreate(async (snap, context) => {
    const repair = snap.data() as {
      description: string;
      fixType: string;
      email: string;
      date: string;
    };

    const msg = {
      to: repair.email,
      from: 'noreply@yourdomain.com',
      subject: 'Bekreftelse på ny reparasjon',
      text: `Hei,\n\nVi har mottatt din reparasjon.\n\nBeskrivelse: ${repair.description}\nType fiks: ${repair.fixType}\nDato: ${repair.date}\n\nTakk!\n`,
      html: `<p>Hei,</p><p>Vi har mottatt din reparasjon.</p><p><strong>Beskrivelse:</strong> ${repair.description}</p><p><strong>Type fiks:</strong> ${repair.fixType}</p><p><strong>Dato:</strong> ${repair.date}</p><p>Takk!</p>`
    };

    try {
      await sgMail.send(msg);
      console.log('E-post sendt:', msg);
    } catch (error) {
      console.error('Feil ved sending av e-post:', error);
    }
  });