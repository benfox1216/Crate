// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin'
import home from './home'
import user from './user'
import product from './product'
import crate from './crate'
// add path for style preferences page -OR- add to the user route.


// Combined routes
export const routes = Object.assign(admin, home, user, product, crate)

// API Routes
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL_API
