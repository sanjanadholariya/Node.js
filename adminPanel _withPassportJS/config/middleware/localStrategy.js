const passport = require('passport')
const localStrategy = require('passport-local').localStrategy
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

module.exports = passport