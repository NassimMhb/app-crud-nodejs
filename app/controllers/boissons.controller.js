const Boissons = require('../models/boissons.model.js');
const path = require('path');

// Create and Save a new boissons
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Boissons content can not be empty"
        });
    }

    // Create a Boissons
    const boissons = new Boissons({
        nom: req.body.nom || "Untitled Boissons", 
        description: req.body.description
    });

    // Save Boissons in the database
    boissons.save()
    .then(data => {
        res.redirect('/boissons')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Boissons."
        });
    });
};

// Retrieve and return all boissons from the database.
exports.findAll = (req, res) => {
    Boissons.find()
    .then(boissons => {
       res.render(path.join(__dirname+'/../../listeBoissons.ejs'), {data: boissons, name:'nassim'});
    //    res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving boissons."
        });
    });
};
    
// Find a single boissons with a boissonsId
exports.findOne = (req, res) => {
    Boissons.findById(req.params.noteId)
    .then(boissons => {
        if(!boissons) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.boissonsId
            });            
        }
        res.send(boissons);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Boissons not found with id " + req.params.boissonsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Boissons with id " + req.params.boissonsId
        });
    });
};

// Update a boissons identified by the boissonsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Boissons content can not be empty"
        });
    }

    // Find note and update it with the request body
    Boissons.findByIdAndUpdate(req.params.boissonsId, {
        nom: req.body.nom || "Untitled Boissons",
        description: req.body.description
    }, {new: true})
    .then(boissons => {
        if(!boissons) {
            return res.status(404).send({
                message: "Boissons not found with id " + req.params.boissonsId
            });
        }
        res.send(boissons);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Boissons not found with id " + req.params.boissonsId
            });                
        }
        return res.status(500).send({
            message: "Error updating boissons with id " + req.params.boissonsId
        });
    });
};

// Delete a boissons with the specified boissonsId in the request
exports.delete = (req, res) => {
    Boissons.findByIdAndRemove(req.params.boissonsId)
    .then(boissons => {
        if(!boissons) {
            return res.status(404).send({
                message: "Boissons not found with id " + req.params.boissonsId
            });
        }
        res.send({message: "Boissons deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Boissons not found with id " + req.params.boissonsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete boissons with id " + req.params.boissonsId
        });
    });
};