const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFileHelper = (files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];
 
        if(!validExtensions.includes(extension)){
           return reject(`Extension: ${extension} is not allowed`);
        }
        
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../../uploads/', folder, tempName);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            resolve(tempName);
        });
    })
}

module.exports = {
    uploadFileHelper,
}