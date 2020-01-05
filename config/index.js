require('dotenv').config()

const {
  DB_PW,
  DB_NAME, 
  PORT = 8000
} = process.env

module.exports = {
  DB_URL: `mongodb+srv://AtlasAdmin:${DB_PW}@cluster0-3qsgw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  PORT,
  UPLOAD_CONFIG: {
    uploadLimit: 5,
    allowedFormats: [
      'image/jpeg',
      'image/png'
    ]
  }
}
