const User = require('../db/User')


const getProfile = async (req, resp) => {
    try {
      let result = await User.findOne({ _id: req.user.username});
      console.log('req.user.username',req.user.username , result)
      
      if (result) {
        const { firstName , lastName ,username , email , avatar , phone_no ,id = _id } = result
        resp.send({ firstName , lastName ,username , email , avatar , phone_no ,id });
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

  module.exports = {getProfile}
