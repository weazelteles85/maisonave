import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import { environment } from './environments/environments'

//admin.initializeApp();
const cors = require('cors')({ origin: true });

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = environment.sendGridKey;


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

export const basicSendEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        const toName = request.body.toName;
        const toEmail = request.body.toEmail;
        const eMailSubject = request.body.eMailSubject;
        const htmlBody = request.body.htmlBody;

        const msg = {
            "to": toEmail,
            "from": 'noreply@telesapps.com',
            "subject": eMailSubject,
            "html": htmlBody
        };


        return sgMail.send(msg)
            .then(() => response.status(200).send('email sent!'))
            .catch((err) => {
                console.log('error occured on response from sendgrid')
                response.status(400).send(err)
            })
    });
})