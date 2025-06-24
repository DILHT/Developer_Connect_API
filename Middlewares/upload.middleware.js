import multer from 'multer';

const storage = multer.diskStorage({
    destination: (_req, _file, calllback) => calllback(null, './uploads'),
    filename: (_req, file , callback) => {
        const ext = file.originalname.split('.').pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;

        callback(null,uniqueName)
    }
});

const upload = multer({storage});

export default upload;