const nodemailer = require('nodemailer');

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otros proveedores
    auth: {
        user: process.env.EMAIL_USER, // Usa variables de entorno para mayor seguridad
        pass: process.env.EMAIL_PASS,
    },
});

const emailController = {
    sendConfirmationEmail: async (req, res) => {
        const { nombre, email, fecha, cantidad, totalPrice } = req.body;

        // Configuración del correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USER, // El correo electrónico desde el que se enviará
            to: email,
            subject: 'XOCHIMILCO OCULTO',
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTkkxRXpprTV3KfrsH1S0j-ygQxC3H5pKM8A&s" alt="Logo de la Empresa" style="width: 100%; max-width: 200px; display: block; margin: 0 auto;">
                            <h2 style="color: #007BFF; text-align: center;">Confirmación de Reserva</h2>
                            <p>Estimado/a ${nombre},</p>
                            <p>Nos complace informarte que tu reserva ha sido confirmada. A continuación, encontrarás los detalles de tu reserva:</p>
                            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px; background-color: #f9f9f9; font-weight: bold;">Fecha:</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${fecha}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px; background-color: #f9f9f9; font-weight: bold;">Cantidad de Lugares:</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${cantidad}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px; background-color: #f9f9f9; font-weight: bold;">Total Pagado:</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">$${totalPrice.toFixed(2)}</td>
                                </tr>
                            </table>
                            <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                            <p>¡Gracias por tu reserva y que tengas un excelente día!</p>
                            <p>Atentamente,<br>
                            El equipo de XOCHIMILCO OCULTO</p>
                        </div>
                    </body>
                </html>
            `,
        };

        try {
            // Enviar correo electrónico
            await transporter.sendMail(mailOptions);
            res.status(200).send('Correo enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        }
    },
};

module.exports = emailController;
