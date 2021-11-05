const AWS=require('aws-sdk');
const util=require('../utils/util');
const bcrypt=require('bcryptjs');

AWS.config.update({

  region :'ap-south-1'

})

const dynamodb=new AWS.DynamoDB.DocumentClient();

const userTable='NetflixCloneUsers';


async function register(userInfo)
{
  const username =userInfo.name;
  const password=userInfo.password;

  if(!username ||  !password)
  {

      return util.buildResponse(401,{

        message:"all fields are required"

      });
  }


  const dynamoUser=await getUser(username.toLowerCase().trim());
  if(dynamoUser && dynamoUser.username)
  {
    return util.buildResponse(401,{

        message:'username already exists'

    });

  }

  const encryptedPassword=bcrypt.hashSync(password.trim(),10);
  const user={
        name:username.toLowerCase().trim(),
        password:password
  }

const saveUserResponse=await saveUser(user);

if(!saveUserResponse)
{

    return util.buildResponse(503,{
        message:'there is some server issue'

    });
}

  return util.buildResponse(200,{username:username});

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


async function saveUser(user)
{

 const params={
    TableName:userTable,
    Item:user

 }

 return await dynamodb.put(params).promise().then(()=>{
      return true;
  },error=>{
    console.error('there is a error',error);

  });
}

module.exports.register=register;

