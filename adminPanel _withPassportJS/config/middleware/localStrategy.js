const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const adminModel = require('../../model/adminModel')
const bcrypt = require('bcrypt')

passport.use(new localStrategy({
    usernameField : 'email'
},async(email , password , cb) => {
    let adminRecord = await adminModel.findOne({email : email})
    if(adminRecord){
        let matchPassword = await bcrypt.compare(passport , adminRecord.password)
        if(matchPassword){
            cb(null , adminRecord)
        }
        else{
            cb(null , false)
        }
    }else{
        cb(null , false)
    }
}
))

passport.serializeUser((user , cb) => {
    cb(null , user.id)
})

passport.deserializeUser(async(id , cb) => {
    let adminRecord = adminModel.findById(id)
    if(adminRecord){
        cb(null , adminRecord )
    }
})


passport.checkAdmin = async(req , res , next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        return res.redirect('/')
    }
}

module.exports = passport