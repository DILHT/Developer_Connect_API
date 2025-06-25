

export const sendConnectionEmail = async(req,res) => {

    const {recipientEmail, subject, message } = req.body;

    try{

        const emailContent = `
        <h3>You have a new DevConnect Collaboration request</h3>
        <p>${message}</p>
        <br/>
        <strong>From:</strong> ${req.user.username} (${req.user.email})`;

        await sendEmail(recipientEmail, subject || 'DevConnect Connection Request', emailContent);

        res.status(200).json({ message: " Email sent Successfully "});

    }catch(err){
        console.error('Email error: ', err);
        res.status(500).json({ message: 'Failed to send email'});
    }



};