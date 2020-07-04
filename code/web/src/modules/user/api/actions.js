// this could be a good place add getStyle action and updateStyle action for user - ARJ

// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// These are the action types, which are associated with actions below - ARJ

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'


// each action above is associated with an action below; they describe what happened 
// but not the how; they are dispatched to the store when we want to update the state of our app - ARJ

// Actions

// Below, they are just setting the user with login info, unless there is login info 
// saved in local storage, then that is used

// Checks if token is truthy and then changes headers? Regardless it 
// returns a setUser action
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// How a user actually signs in w/ password and email
// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })
    // this may be where we need to add style preference attribute, under fields
      // we can set value to null unless they have taken the survey already. This
      // is where we are sending the user info to the backend - ARJ
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''
        // error handling
        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          // setting user info based on response if it's truthy (or not empty string)
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user
          // here we are invoking the setUser function w/ token and user info which returns the action and 
          // dispatches to the store w / user info - ARJ
          dispatch(setUser(token, user))
          // saving user info to localStorage
          loginSetUserLocalStorageAndCookie(token, user)
        }
        // dispatches LOGIN_RESPONSE action to store with error from response
        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      // error handling
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
// Registers a user and sends info to backend through post; there is no action for the store 
// bc it does not save to state until the user logs in after registering
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()
    // this action dispatches LOGOUT which sets user details to null and 
    // isAuthenticated to false and invokes function above
    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
