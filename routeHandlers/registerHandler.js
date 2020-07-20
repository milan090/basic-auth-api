const saltRounds = 10;

const registerHandler = (req,res,db,bcrypt) => {
  const { email, name, password } = req.body;
  const isValid = (email && name && password);
  if (isValid){
    db.select('email').from('users').where('email', '=', email).then(data => {
      if (data[0]){
        return res.status(400).json({error: "User already exists"})
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
    
        const toRegister = {email, name, hash};
        
        db('users').insert(toRegister, ['id','name', 'email']).then(data => {
          // Register Success
          const user = data[0];
          req.session.user = user;
          return res.json(user);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({error: "Something went wrong"});
        })
      }
    }).catch(err => {
      console.log(err);
      return res.status(500).json({error: "Something went wrong"});
    })
  } else {
    res.status(400).json({error: "Something went wrong"});
  }
}

module.exports = registerHandler;