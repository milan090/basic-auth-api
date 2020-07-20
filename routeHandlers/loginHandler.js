const loginHandler = (req,res,db,bcrypt) => {
  // Read register handler before this
  const { email, password } = req.body;
  db.select('*').from('users')
  .where('email', '=', email)
  .then(data => {
    if (data[0]){
      // If both hashes match isAuthorized is true
      const isAuthorized = bcrypt.compareSync(password, data[0].hash);
      if (isAuthorized){
        // Login Succes
        const user = {
          id: data[0].id,
          email: data[0].email,
          name: data[0].name
        };
        req.session.user = user;
        return res.json(req.session.user);
      } else {
        // Do not tell the user wrong password (for security purpose)
        res.status(400).json({error: "Wrong Email/Password combination"});
      }
    } else {
      // Do not tell the user wrong email (for security purpose)
      res.status(400).json({error: "Wrong Email/Password combination"});
    }
  })
  .catch(err => {
    // if something wrong with server or database
    // Report this --> https://github.com/milan090/basic-auth-api/issues
    res.status(500).json({error: "Something went wrong"});
    console.log(err, "Report here https://github.com/milan090/basic-auth-api/issues");
  })
}

module.exports = loginHandler;