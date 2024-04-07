const express = require('express');
const multer = require('multer');
const {getProduit,getDetailProduit, updateProduit, addFile,articleDelete, listeFile } = require('../controllers/controlllerFile');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix ); // Remplacez '.jpg' par l'extension de fichier appropriée
  }
});

const upload = multer({ storage: storage });

// Utilisez upload.single() uniquement pour les routes qui reçoivent un seul fichier
router.post('/article-add', upload.single('image'), addFile);
router.delete('/article-delete/:id', articleDelete);
router.get('/get-produit/:id', getProduit);
router.get('/get-detail-produit/:id', getDetailProduit);


router.put('/update-produit/:id',upload.single('image'),updateProduit)
router.get('/liste-file', listeFile);

module.exports = router;
