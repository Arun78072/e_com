const moment = require('moment');
const User = require('../db/User')
const jwt = require('jsonwebtoken');
const expiresIn = "3600s";


const loginUser = async (req, resp) => {
    try {
      let result = await User.findOne({ username: req.body.username, password: req.body.password });
      if (result) {
        const token = jwt.sign({ username: result._id }, 'secret_key', { expiresIn });
        const response = { token: token, ...result.toObject() };
        const {firstName , lastName ,username , email , avatar , phone_no ,id = _id} = result
        resp.send({firstName , lastName ,username , email , avatar , phone_no ,id ,token})
      } else {
        // If the user is not found, send a 404 status code along with an error message.
        resp.status(404).send({ error: 'User not found' });
        // resp.send({ error: 'User not found' });
      }
    } catch (error) {
      // Handle any potential errors that may occur during the database query or token generation.
      resp.status(500).send({ error: 'Something went wrong' });
    //   resp.send({ error: 'Something went wrong' });
    }
  };


// const signUp = async (req , resp) =>{
//     console.log('req -- ',req.body)
//     let findUser = await User.find({username:req.body.username})
//     if(findUser.length == 0){
//         let user = new User({...req.body, createdAt : moment().unix()})
//         let result = await user.save()

//         const token = jwt.sign({username: findUser._id}, 'secret_key',{expiresIn})
//         const {firstName , lastName ,username , email , avatar , phone_no ,id = _id} = result
//         resp.send({firstName , lastName ,username , email , avatar , phone_no ,id ,token})
//     }else{
//         resp.status(404).send({ error: 'Duplicate user found ' });
//     }
// }


const signUp = async (req, resp) => {
  console.log('req -- ', req.body);
  let findUser = await User.find({ username: req.body.username });
  
  if (findUser.length === 0) {
      let user = new User({ ...req.body, createdAt: moment().unix() });

      // Assuming the uploaded image is stored in req.file
      if (req.file) {
          user.avatar = req.file.filename; // Store the image filename in the 'avatar' field
      }
      let result = await user.save();
      const token = jwt.sign({ username: findUser._id }, 'secret_key', { expiresIn });
      const { firstName, lastName, username, email, avatar, phone_no, _id } = result; // Changed 'id' to '_id'
      resp.send({
          firstName,
          lastName,
          username,
          email,
          avatar,
          phone_no,
          id: _id,
          token
      });
  } else {
      resp.status(404).send({ error: 'Duplicate user found' });
  }
};





module.exports = {loginUser,signUp}