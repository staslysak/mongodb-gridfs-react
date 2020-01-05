
const router = require('express').Router();
const controllers = require('../controllers/upload');


router.post('/upload', controllers.uploadFiles);
router.get('/files', controllers.getFiles);
router.get('/files/:filename', controllers.getFile);
router.get('/image/:filename', controllers.displayImage);
router.delete('/files/:id', controllers.deleteFile);


module.exports = router;
