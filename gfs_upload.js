
const crypto = require('crypto');
const multer = require('multer');
const GridFSBucket = require('multer-gridfs-storage');
const config = require('./config');


module.exports = multer({ 
  storage: new GridFSBucket({
    url: config.DB_URL,
    options: {
      useNewUrlParser: true
    },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (error, buf) => {
          if (error) return reject(error);
          const fileInfo = {
            filename: buf.toString('hex') + '_' + file.originalname, //  path.extname(file.originalname)
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  }),
  fileFilter: (req, file, next) => {
    config.UPLOAD_CONFIG.allowedFormats.includes(file.mimetype) ?
    next(null, true) :
    next('Format is not allowed')
  },
  limits: 1024 * 1024 * 4
});
