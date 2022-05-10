const Product = require('../models/Product');
const cloudinary = require('../config/cloudinatyConfig');
//const match = require('../utils/regex');

exports.getAllPublishedProducts = async (req, res) => {
    try {
        const productData = await Product.find({ state: { $eq: {published: true} } })
        if (!productData) {
            return res.status(404).json({message: 'Aucun article trouvé.. Ajoutez-en un !'})
        }
        const totalProducts = await Product.count({ state: { $eq: {published: true} } })
        res.status(200).json({ products: productData, productsTotal: totalProducts })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, error })
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const productData = await Product.find()
        if (!productData) {
            return res.status(404).json({message: 'Aucun article trouvé...'})
        }
        const totalProducts = await Product.count()
        res.status(200).json({ products: productData, totalProducts: totalProducts })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, error })
    }
};

exports.addProduct = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'shoppingApp',
            public_id: `image-${req.file.filename}`,
            width: 640,
            height: 450 ,
            crop: 'fill'
        });

        const taille = req.body.tailles.split(',');
        const couleur = req.body.couleurs.split(',').map(e => e.trim());
        const options = { taille, couleur };
        const state = { published: req.body.published === 'on' ? true : false };
        const { title, textContent, productInfo, price, categories } = req.body;

        const body = {
            title,
            textContent,
            img: result.secure_url,
            productInfo,
            price,
            categories,
            options,
            state,
        };

        const newProduct = await Product.create(body)
        if (!newProduct) {
            return res.status(404).json({ message: 'Il y a eu une erreur. Vérifiez vos informations puis réessayez.' })
        }
        res.status(200).json({ product: newProduct, message: "Article ajouté avec succès !" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, error })
    }
};

exports.findProduct = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        res.status(200).json({ product })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: 'Erreur. Vérifiez vos informations puis réessayez.', error: error.message })
        }
        res.status(400).json({ message: error.message, error })
    }
};

exports.updateProduct = async (req, res) => {
    let newPrice;
    if (Number.isInteger(req.body.price)) {
        newPrice = parseInt(req.body.price);
    } else {
        newPrice = parseFloat(req.body.price);
    };
    const state = {published: req.body.published === 'on' ? true : false}
    const body = {...req.body, price: newPrice, ...state};
    const taille = req.body.tailles.length > 1 ? req.body.tailles.split(',') : req.body.tailles.toArray();
    const couleur = req.body.couleurs.split(',').map(e => e.trim());
    const bodyOptions = { taille, couleur };

    try {
        const productToUpdate = await Product.findById({ _id: req.params.id });
        const {title, textContent, img, productInfo, price, categories} = productToUpdate;
        const otherOptions = {
            published: productToUpdate.state.published,
            tailles: productToUpdate.options.taille.toString(),
            couleurs: productToUpdate.options.couleur.toString(),
        };
        const productToCompare = {title, textContent, categories, productInfo, price, ...otherOptions};
        console.log(body, productToCompare);

        if (!req.file && JSON.stringify(body) === JSON.stringify(productToCompare)) {
            return res.status(400).json({ message: "Action impossible car l'article ne semble pas avoir été modifié. Veuillez vérifier vos informations avant de réessayer."})
        }

        if (req.file) {
            const resultImage = await cloudinary.uploader.upload(req.file.path, {
                folder: 'shoppingApp',
                public_id: `image-${req.file.filename}`,
                width: 640,
                height: 450 ,
                crop: 'fill'
            });
            const newImage = resultImage.secure_url;
            const publicId = 'shoppingApp/' + productToUpdate.img.split('/')[8].split('.')[0];

            const bodyData = {
                title: body.title,
                textContent: body.textContent,
                img: newImage,
                productInfo: body.productInfo,
                price: body.price,
                categories: body.categories,
                options: bodyOptions,
                state
            };

            await cloudinary.uploader.destroy(publicId);
            const updatedProduct = {...productToUpdate._doc, ...bodyData}
            const result = await Product.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, { new: true, runValidators: true })
            res.status(200).json({ result, message: "L'article a bien été modifié." });
        } else {
            const bodyData = {
                title: body.title,
                textContent: body.textContent,
                img: productToUpdate.img,
                productInfo: body.productInfo,
                price: body.price,
                categories: body.categories,
                options: bodyOptions,
                state
            };

            const updatedProduct = {...productToUpdate._doc, ...bodyData}
            const result = await Product.findByIdAndUpdate(req.params.id, {$set: updatedProduct}, { new: true, runValidators: true })
            res.status(200).json({ result, message: "L'article a bien été modifié." });
        };
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId" || error.message === "Cannot read properties of null (reading '_doc')") {
            return res.status(400).json({ message: 'Erreur. Vérifiez vos informations puis réessayez.', error: error.message })
        }
        res.status(400).json({ message: error.message, error })
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        const publicId = 'shoppingApp/' + product.img.split('/')[8].split('.')[0];
        const deleteImgOnCloudinary = await cloudinary.uploader.destroy(publicId);
        console.log(deleteImgOnCloudinary);
        res.status(200).json({ product, message: `Article "${product.title}" supprimé` })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: 'Erreur. Vérifiez vos informations puis réessayez.', error: error.message })
        }
        res.status(500).json({ message: error.message, error })
    }
};
