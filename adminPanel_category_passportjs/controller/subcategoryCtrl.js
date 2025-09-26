const subcategoryModel = require('../model/subcategoryModel')
const categoryModel = require('../model/categoryModel')

module.exports.addSubCategoryPage = async(req , res) => {
    try{
        let category = await categoryModel.find({})
        // console.log(category)
        return res.render('subcategory/addSubcategoryPage',{
            category
        })
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.addSubcategory = async(req , res) => {
    try{
        console.log(req.body);
        let subcategory = await subcategoryModel.create(req.body)
        if(subcategory){
            req.flash('success',"Subcategory Added")
            return res.redirect('/subcategory/viewSubcategoryPage')
        }
        else{
            req.flash('error',"Something Went Wrong")
            return res.redirect('/admin')
        }
        
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

 module.exports.viewSubcategoryPage = async(req , res) => {
    try{

        let subcategory = await subcategoryModel.find().populate('category')
        
        // let search = ""
        // if(req.query.search){
        //     search = req.query.search.toLowerCase()
        //     subcategory = subcategory.filter((val) => {
        //         val.subcategory.includes(search) || val.category.item.includes(search)
        //     })
        //     console.log(subcategory)
        // }

        //  subcategory =  await subcategoryModel.find({
        //     $or : [
        //         {
        //             category : {$regex : search , $options : 'i'}
        //         },{
        //             subcategory : {$regex : search , $options : 'i'}
        //         }
        //     ]
        // }).populate(category)

        // if(req.query.reset){
             subcategory = await subcategoryModel.find().populate('category')
        // }
        // console.log(subcategory)
        return res.render('subcategory/viewSubcategoryPage',{
            subcategory
        })
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
 }

 module.exports.deleteSubcategory = async(req , res ) => {
    try{
        console.log(req.params.id)
        await subcategoryModel.findByIdAndDelete(req.params.id)
        return res.redirect('/subcategory/viewSubcategoryPage')
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
    }
 }

 module.exports.editSubcategoryPage = async(req , res) => {
    try{
        console.log(req.params.id)
        const single = await subcategoryModel.findById(req.params.id).populate('category')
        // console.log("Single :- ",single)
        return res.render('subcategory/editSUbcategoryPage',{single})
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
 }

 module.exports.editSubcategory = async(req , res) => {
    try{
        const single = await subcategoryModel.findById(req.params.id)
        console.log(single)

        await subcategoryModel.findByIdAndUpdate(single.id , {subcategory : req.body.subcategory})

        return res.redirect('/subcategory/viewSubcategoryPage')
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
 }