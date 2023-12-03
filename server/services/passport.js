import passportJWT from 'passport-jwt'
import User from '../models/User.model.js'
import options from '../config.js'

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: options.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  const user = await User.findById(jwtPayload.uid)
  try {
    if (user) {
      return done(null, user)
    }

    return done(null, false)
  } catch (err) {
    return done(err, null)
  }
})

export default jwtStrategy
