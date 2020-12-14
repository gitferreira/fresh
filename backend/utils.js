import jwt from "jsonwebtoken"

//Nota*: Guardar el Secret de JSON web token en la variables entorno. 

export const generateToken = (user) => {
	return jwt.sign({
		_id: user.id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	}, process.env.JWT_SECRET || "somethingsecret", {
		expiresIn: "30d",
	});
}

//Note*: Use next() to pass to the next middleware
export const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization;
	if (authorization) {
	  const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
	  jwt.verify(
		token,
		process.env.JWT_SECRET || 'somethingsecret',
		(err, decode) => {
		  if (err) {
			res.status(401).send({ message: 'Invalid Token' });
		  } else {
			req.user = decode;
			next();
		  }
		}
	  );
	} else {
	  res.status(401).send({ message: 'No Token' });
	}
  };

  export const isAdmin = (req, res, next) => {
	  if(req.user && req.user.isAdmin) {
		  next()
	  } else {
		res.status(401).send({ message: 'No Admin' });
	  }
  }