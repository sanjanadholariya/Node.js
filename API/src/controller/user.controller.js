module.exports.registerUser = async(req , res) => {
    try {
        return res.json({status : 200 , message : "success"});
    } catch (error) {
        console.log(error);
        return res.json({message : "Something went wrong"})
    }
}