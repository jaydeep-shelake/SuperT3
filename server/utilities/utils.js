const jwt = require('jsonwebtoken')

const randRoom = () => {
    var result = '';
    var hexChars = '0123456789abcdef';
    for (var i = 0; i < 16; i += 1) {
        result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
}

const randPiece = () => {
    return Math.random() > 0.5 ? 'X':'O'
}


const genrateToken =(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        eamil:user.email,
        isAdmin:user.isAdmin,
    },'BhaiKaBirthday',{
        expiresIn:'30d',
    })
}
 const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization
    // console.log(req.headers.authorization)
    if(authorization){
      const token = authorization.slice(7,authorization.length) //bearer token value
      jwt.verify(token,'BhaiKaBirthday',(err,decode)=>{
          if(err){
              res.status(401).send({message:'Invalid token'})
          }
          else{
              req.user=decode
              next()
          }
      })
    }
    else{
        res.status(401).send({message:'No token'})

    }
}

module.exports = {randRoom, randPiece,genrateToken,isAuth};