const util=require('../utils/utils');

const auth=require('../utils/auth');
function verify(requestBody)
{
  if(!requestBody.user ||  !requestBody.user.username)
  {
  return util.buildResponse(401,{

     verified:false,
     message:'incorrect'

  });

  }

  const user=requestBody.user;
  const token=requestBody.token;
  const verificaition=auth.verifyToken(user.username,token);

  if(!verificaition.verified)
  {
  return util.buildResponse(401,verificaition);

  }

  return util.buildResponse(200,{

    verified:true,
    message:'success',
    user:user,
    token:token


  });




}


module.exports.verify=verify;