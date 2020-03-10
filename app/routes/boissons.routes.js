module.exports = (app) => {
    const boissons = require('../controllers/boissons.controller.js');

    // Creer une nouvelle boisson
    app.post('/boissons', boissons.create);

    // Retrouver toutes les boissons
    app.get('/boissons', boissons.findAll);

    // Retrouver une boisson avec l'id
    app.get('/boissons/:boissonsId', boissons.findOne);

    // Modifier une boisson
    app.put('/boissons/:boissonsId', boissons.update);

    // Supprimer une boisson avec l'id
    app.delete('/boissons/:boissonsId', boissons.delete);
}