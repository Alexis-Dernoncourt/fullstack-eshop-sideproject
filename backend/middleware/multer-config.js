const { MulterError } = require('multer');
const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

const storage = multer.diskStorage({
  filename: (_, file, callback) => {
    const name = file.originalname.split('.jpg')[0].split(' ').join('-').split('_').join('-').split('.')[0];
    //const extension = MIME_TYPES[file.mimetype];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateNow = new Date().toLocaleDateString('fr-FR', options).split(' ').join('-');
    callback(null, name + Date.now() + '-' + dateNow);
  }
});

const fileFilter = (_, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(new MulterError('MIMETYPE_FILE_ERROR'), false);
  }
};

module.exports = multer({storage: storage, limits: {fileSize: 10*1000*1000}, fileFilter}).single('image');
