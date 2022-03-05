const { response, request } = require('express');
const { uploadFileHelper } = require('../shared/helpers');

const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Product } = require('../models');

/**
 * Upload file
 * @param {request} req 
 * @param {response} res 
 */
const uploadFile = async (req, res) => {
    try {
        const file = await uploadFileHelper(req.files, undefined, 'img');

        res.json({
            name: file
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
   
}

/**
 * Upload images on server
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
const editFileUser = async (req, res) => {
    const { id, collection  } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`User: ${id} doesn't exist`
                })
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`Product: ${id} doesn't exist`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'I forgot this option, sorry'});
    }

    //Clean previous images
    try {
        if(model.image){
            //Delete image from server
            const imgPath = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(imgPath)){
                fs.unlinkSync(imgPath);
            }
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const file = await uploadFileHelper(req.files, undefined, collection);

        model.image = file;
        await model.save();

        res.json(model)

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

/**
 * Upload images with Cloudinary
 * @param {request} req 
 * @param {response} res 
 * @returns
 */
const editFileUserCloudinary = async (req, res) => {
    const { id, collection  } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`User: ${id} doesn't exist`
                })
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`Product: ${id} doesn't exist`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'I forgot this option, sorry'});
    }

    //Clean previous images
    try {
        if(model.image){
            const arr = model.image.split('/');
            const name = arr[arr.length - 1];
            const [ public_id ] = name.split('.'); 
            await cloudinary.uploader.destroy(public_id);
        }

        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

        model.image = secure_url;
        await model.save();

        res.json(model);

    } catch (error) {
        console.log(error);
    }
}

/**
 * Get images from users or products
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getImage = async (req = request, res = response) => {
    const { id, collection  } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`User: ${id} doesn't exist`
                })
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`Product: ${id} doesn't exist`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'I forgot this option, sorry'});
    }

    //Clean previous images
    try {
        if(model.image){
            //Delete image from server
            const imgPath = path.join(__dirname, '../uploads', collection, model.image);
            if(fs.existsSync(imgPath)){
                return res.sendFile(imgPath);
            }
        }
    } catch (error) {
        console.log(error);
    }

    pathByDefault = path.join(__dirname, '../assets/img/no-image.jpg');
    res.sendFile(pathByDefault);
}

module.exports = {
    uploadFile,
    editFileUser,
    getImage,
    editFileUserCloudinary
}