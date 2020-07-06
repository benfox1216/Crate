// Imports constants/functions from other files
// App Imports
import params from '../../config/params'
import models from '../../setup/models'

// Handles getAll query
// Get all products
export async function getAll() {
  return await models.Product.findAll({ order: [['id', 'DESC']] })
}

// Handles getBySlug query
// Get product by slug
export async function getBySlug(parentValue, { slug }) {
  const product = await models.Product.findOne({ where: { slug } })

  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Handles getById query
// Get product by ID
export async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } })

  if (!product) {
    // Product does not exists
    throw new Error('The product you are looking for does not exists or has been discontinued.')
  } else {
    return product
  }
}

// Handles getRelated query
// Get related products
export async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
    where: {
      id: { [models.Sequelize.Op.not]: productId }
    },
    limit: 3,
    order: [[models.Sequelize.fn('RAND')]] // mock related products by showing random products
  })
}

// Creates a product, and handles exceptions
// Create product
// Feature: Add style to params
export async function create(parentValue, { name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image
    })
  } else {
    throw new Error('Operation denied.')
  }
}

// Updates a product, and handles exceptions
// Update product
// Feature: Add style to params
export async function update(parentValue, { id, name, slug, description, type, gender, image }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image
      },
      { where: { id } }
    )
  } else {
    throw new Error('Operation denied.')
  }
}

// Deletes a product, and handles exceptions
// Delete product
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({where: {id}})

    if (!product) {
      // Product does not exists
      throw new Error('The product does not exists.')
    } else {
      return await models.Product.destroy({where: {id}})
    }
  } else {
    throw new Error('Operation denied.')
  }
}

// Handles getTypes query
// Product types
export async function getTypes() {
  return Object.values(params.product.types)
}
