// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
// This links to the create mutation (line 10)
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exist
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)
  // This allows it to be asynchronus
    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// This links to the login query (line 24)
export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
// This links to the getById query (line 15)
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
// This links to the getAll query (line 11)
export async function getAll() {
  return await models.User.findAll()
}

// We may need an update function here (This may be what generates the mutation, or vise versa)

// Delete
// This links to the remove mutation (line 36)
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
// This links to the getGenders query (line 46)
export async function getGenders() {
  return Object.values(params.user.gender)
}

// These methods interact with the database to do the methods
