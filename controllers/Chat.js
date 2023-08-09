const User = require('../db/User')

const allUsers = async(req , resp)=>{
    let result = await User.find()
    if(result){
        const filterResult  = result.map((user)=>({
            userId : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
        }))
        resp.send(filterResult)
    }else{
        resp.json('No user Found')
    }
}
module.exports= {allUsers}