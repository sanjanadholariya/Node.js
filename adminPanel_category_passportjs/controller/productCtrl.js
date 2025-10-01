const categoryModel = require('../model/categoryModel')
const subcategoryModel = require('../model/subcategoryModel')
const extraCategoryModel = require('../model/extraCategoryModel')
const productModel = require('../model/productModel')

module.exports.addProductPage = async(req , res) => {
    try{
        // console.log("addProductPage")
        const category = await categoryModel.find({});
        const subcategory = await subcategoryModel.find({});
        const extraCategory = await extraCategoryModel.find({});
        // console.log(subcategory)
       
        return res.render('product/addProductPage',{
            category,subcategory,extraCategory
        })
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.addProduct = async(req , res) => {
    try{
        console.log(req.body)
        if(req.file){
            req.body.productImage = req.file.filename
            // console.log(req.file)
        }
         await productModel.create(req.body)
         return res.redirect('/product/viewProductPage')
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.viewProductPage = async(req , res) => {
    try{
        console.log("viewProductPage")
        const allProduct = await productModel.find().populate('category').populate('subcategory').populate('extraCategory')
        // console.log(allProduct)
        return res.render('product/viewProductPage',{allProduct})
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
    }
}

module.exports.viewSingleProductPage = async(req , res) => {
    try{
        const single = await productModel.findById(req.params.id).populate('category').populate('subcategory').populate('extraCategory')
        // console.log(single)
        return res.render('product/viewSingleProductPage',{single})
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}