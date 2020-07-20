const loginHandler = (req,res,db,bcrypt) => {
  const { email, password } = req.body;
  db.select('*').from('users')
  .where('email', '=', email)
  .then(data => {
    if (data[0]){
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
        res.status(400).json({error: "Wrong Email/Password combination"});
      }
    } else {
      res.status(400).json({error: "Wrong Email/Password combination"});
    }
  })
  .catch(err => {
    res.status(500).json({error: "Something went wrong"});
    console.log(err);
  })
}

module.exports = loginHandler;