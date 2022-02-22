import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default mail;

// mail.send({
//  to: 'test@example.com',
//  from: 'test@example.com',
//  subject: 'Sending with Twilio SendGrid is Fun',
//  text: 'and easy to do anywhere, even with Node.js',
//  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// });