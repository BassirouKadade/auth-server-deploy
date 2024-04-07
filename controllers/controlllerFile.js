const { Produit } = require('../config/sequelize');
const fs=require('fs')
const path=require('path')

const controllerFile = {
  addFile: async (request, response) => {
    try {
      console.log(request.file)
      await Produit.create({
        reference: request.body.reference,
        prix: request.body.prix,
        image: request.file.filename
      });
      response.json('Image ajoutée avec succès');
    } catch (error) {
      console.error('Erreur :', error);
      response.status(500).json('Une erreur est survenue lors de l\'ajout de l\'image');
    }
  },
  listeFile:async (request, response) => {
    try {
      const liste= await Produit.findAll()
      response.json(liste);
    } catch (error) {
      console.error('Erreur :', error);
      response.status(500).json('Une erreur est survenue lors de l\'ajout de l\'image');
    }
  },

articleDelete: async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Produit.findByPk(id);
    if (!article) {
      return response.status(404).json({ message: "L'article n'existe pas" });
    }

    const chemin = path.join(__dirname, '..','uploads', article.image); // Construisez le chemin complet

    // Suppression du fichier associé à l'article s'il existe
    if (article.image) {
       await fs.promises.unlink(chemin); // Utilisez fs.promises.unlink pour une suppression asynchrone
    }

    await article.destroy(); // Suppression de l'article dans la base de données

    response.json({ message: "L'article a été supprimé avec succès" });
  } catch (error) {
    console.error('Erreur :', error);
    response.status(500).json('Une erreur est survenue lors de la suppression de l\'article');
  }
},
getProduit: async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Produit.findByPk(id);
    if (!article) {
      response.status(404).json({ error: "Article non trouvé" });
    } else {
      response.json(article);
    }
  } catch (error) {
    console.error('Erreur :', error);
    response.status(500).json('Une erreur est survenue lors de la récupération de l\'article');
  }
},
getDetailProduit:async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Produit.findByPk(id);
    if (!article) {
      response.status(404).json({ error: "Article non trouvé" });
    } else {
      response.json(article);
    }
  } catch (error) {
    console.error('Erreur :', error);
    response.status(500).json('Une erreur est survenue lors de la récupération de l\'article');
  }
},
updateProduit: async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Produit.findByPk(id);
    if (!article) {
      response.status(404).json({ error: "Article non trouvé" });
    } 
    const articlesPath=path.join(__dirname,'..','uploads',article.image)
    await fs.promises.unlink(articlesPath)

    await article.update({
      "reference":request.body.reference,
      "prix":request.body.prix,
      "image":request.file.filename
    })
    
    response.json({message:"mise  a jour effectuees"});
    
  } catch (error) {
    console.error('Erreur :', error);
    response.status(500).json('Une erreur est survenue lors de la récupération de l\'article');
  }
},
  
};

module.exports = controllerFile;
