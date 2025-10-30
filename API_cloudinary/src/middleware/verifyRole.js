const verifyRole = (...role) => {
  try {
    return (req,res,next) => {
      if(!role.includes(req.user.role)){
        return res.status(403).json({message : "Access denied. You don't have permission for this action."})
      }
      next();
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error  !"})
  }
}

module.exports = verifyRole;