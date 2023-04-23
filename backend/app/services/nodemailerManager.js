import nodemailer from 'nodemailer';

export default {
    async nodemailer(oldUser, link, res) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'formationlm123@gmail.com',
                pass: 'svlilfzvwegoyvut',
            },
        });

        const mailOptions = {
            from: 'formationlm123@gmail.com',
            to: oldUser.email,
            subject: 'Password Reset',
            text: 'Hello. This email is for your password verification.',
            html: `
            <body style="font-family: Verdana, Geneva, Tahoma, sans-serif;">

                <div class="section" style="margin-bottom:6rem;">
                    <h4 style="font-size: 20px">Bonjour ${oldUser.pseudo},</h4>
                    <p> Vous avez oublié votre mot de passe ?<br>Rien de grave !</p>
                    <p>Voici le lien (valable 30 min) pour créer votre nouveau mot de passe et accéder à<br>votre compte :
                    <a href="${link}" target="_blank">
                        ${link}
                    </a>
                    </p>
                </div>

                <div class="footer" style="background: linear-gradient(257.08deg, #457B9D 12.59%, #CAF0F8 98.99%)">
                <div class="icons" style="text-align: end; padding: 1rem;">
                    <div class="sub-footer" style="display: flex; justify-content: space-between;">
                        <ul style="list-style: none; display: flex; padding: 0;">
                            <li>Conditions</li>
                            <li style="margin-left: 2rem; margin-right: 2rem;">Politique de confidentialité</li>
                            <li>Mentions légale</li>
                        </ul>
                    </div>
                </div>
                </div>

            </body>
            `,
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error);
            }

            return res.status(200).json({
                status: 200,
                message: info.response,
            });
        });
    },

};
