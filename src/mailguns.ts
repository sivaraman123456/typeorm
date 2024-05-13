import mg from 'mailgun-js';

interface MailgunConfig {
    apiKey: string;
    domain: string;
}

const mailgun = (): mg.Mailgun => {
    const config: MailgunConfig = {
        apiKey: process.env.MAILGUN_API!,
        domain: process.env.MAILGUN_DOMAIN!
    };

    return mg(config);
};

export default mailgun;