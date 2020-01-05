
const mongoose = require('mongoose');
const GridFS = require('gridfs-stream');
const config = require('../config');
const upload = require('../gfs_upload');
let gfs;


//Init stream
mongoose.connection.once('open', async () => {
  // let opts = {
  //   bucketName: 'uploads',
  // };
  // gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, opts)
  // const fil = await mongoose.connection.db.collection('uploads.files').find().toArray()
  // console.log(fil)
  gfs = GridFS(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});


module.exports = {
  uploadFiles: (req, res) => {
    // single('name')  for  single upload
    upload.array(
      'file', 
      config.UPLOAD_CONFIG.uploadLimit
    )(req, res, (error) => {
      if(error) {
        return res.status(404).json({error});
      }
      return res.status(200).json({files: req.files});  
    })
  },
  getFiles: (req, res) => {
    gfs && gfs.files.find().toArray((error, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({error: 'No files exist'});
      }
      return res.json({files, allowedFormats: config.UPLOAD_CONFIG.allowedFormats});
    });
  },
  getFile: (req, res) => {
    gfs && gfs.files.findOne({filename: req.params.filename}, (error, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({error: 'No file exists'});
      }
      return res.json({file});
    });
  },
  displayImage: (req, res) => {
    gfs && gfs.files.findOne({filename: req.params.filename}, (error, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({error: 'No file exists'});
      }
  
      // Check if image
      if (config.UPLOAD_CONFIG.allowedFormats.includes(file.contentType)) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({error: 'Not an image'});
      }
    });
  },
  deleteFile: (req, res) => {
    gfs.remove({_id: req.params.id, root: 'uploads'}, (error, gridStore) => {
      if (error) return res.status(404).json({error});
      res.status(200).json({message: 'Succesfully deleted'});
    });
  }
}
