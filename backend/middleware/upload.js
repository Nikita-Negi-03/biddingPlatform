// middleware/upload.js

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});

module.exports = upload;
