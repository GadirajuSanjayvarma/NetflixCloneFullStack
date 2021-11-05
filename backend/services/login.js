const AWS=require('aws-sdk');
const util=require('../utils/utils');
const bcrypt=require('bcryptjs');
const auth=require('../utils/auth');
AWS.config.update({

  region :'ap-south-1'

})

const dynamodb=new AWS.DynamoDB.DocumentClient();

const userTable='NetflixCloneUsers';



async function login(user)
{
  const username=user.username;
  const password=user.password;

  if(!user || !username || !password)
  {
    return util.buildResponse(401,{
        message:"every field is required"

    });

  }

  const dynamoUser=await getUser(username);

  if(!dynamoUser || !dynamoUser.username)
  {
   return util.buildResponse(403,{message:"user does not exists"});

  }

   if(!bcrypt.compareSync(password,dynamoUser.password))
   {

     return util.buildResponse(403,{message:"passwords dont match"});
   }

   const userInfo={
    username:dynamodb.username,
    password:dynamodb.password

   }


   const token=auth.generateToken(userInfo);


const response={
    user:userInfo,
    token:token
}


return util.buildResponse(200,response);


}



async function getUser(username)
{
 const params={
   TableName:userTable,
   Key:{

        username:username

   }


 }

  return await dynamodb.get(params).prmise().then(response=>{
   return response.Item;
   },error=>{
     console.error('there is a error',error);

   }
);

}

module.exports.login=login;

