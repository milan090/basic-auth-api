const saltRounds = 10; 
// Salt rounds for encryption. Increase this to improve security of hash
// But will slow down hashing time

const registerHandler = (req,res,db,bcrypt) => {
  // First get the email, name and password from body
  const { email, name, password } = req.body;

  const isValid = (email && name && password);
  // This checks if all fields have minimum 1 character
  // Edit to add custom validation like minimum length
  if (isValid){
    // Emails need to be unique in out database
    // First checks if a user with same email exists or not
    db.select('email').from('users').where('email', '=', email).then(data => {
      if (data[0]){
        // If email is used
        // Return a 400 error message (Error from client side)
        return res.status(400).json({error: "User already exists"})
      } else {
        // Syncronously hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
    
        const toRegister = {email, name, hash};
        
        // Registers and returns id, name and email into --> data
        db('users').insert(toRegister, ['id','name', 'email']).then(data => {
          // Register Success
          // Get first row (Data is an array)
          const user = data[0];
          // Setting user session (also sets cache for user)
          // Read more here --> https://www.npmjs.com/package/express-session
          req.session.user = user;
          return res.json(user);
        })
        .catch(err => {
          // If any error from server like database error
          console.log(err, "Report here https://github.com/milan090/basic-auth-api/issues");
          return res.status(500).json({error: "Something went wrong"});
        })
      }
    }).catch(err => {
      // If any error from server like database error
      console.log(err, "Report here https://github.com/milan090/basic-auth-api/issues");
      return res.status(500).json({error: "Something went wrong"});
    })
  } else {
    // If fields are not valid
    res.status(400).json({error: "Something went wrong"});
  }
}

module.exports = registerHandler;