const jwt=require('jsonwebtoken');

function generateToken(user)
{
  if(!user)
  {
      return null
  }

  const userInfo={
  username:user.username,
  password:user.password

  };

  return jwt.sign(userInfo,process.env.JWT_SECRET,{
    expiresIn:'1h'

  })

}

function verifyToken(username,token)
{
  return jwt.verify(token,process.env.JWT_SECRET,(error,response)=>{

     if(error)
     {
           return{
               verified:false,
               message:'invalid user'
           }
     }

     if(response.username !==username)
     {
        return{
            verified:false,
            message:'invalid user'
        }

     }

     return {
        verified:true,
        message:'verified'

     }



  });


}



module.exports.generateToken=generateToken;
module.exports.verifyToken=verifyToken;
