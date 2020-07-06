// Imports functions/constants from other files
// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { create } from '../subscription/api/actions'

// Component
class Item extends PureComponent {

  // Disables button when it's already been pressed, and is loading information
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  // Sets "isLoading" to true when button is pressed, and hasn't loaded info
  onClickSubscribe = (crateId) => {
    this.setState({
      isLoading: true
    })
    
    // Message that shows while info is being loaded
    this.props.messageShow('Subscribing, please wait...')
    
    // Creates a subscription, and handles exceptions
    // Feature: Verify there is a style defined for the user...if not then
    // direct to the style-preferences page
    this.props.create({ crateId })
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Subscribed successfully.')

          this.props.history.push(userRoutes.subscriptions.path)
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error subscribing to this crate. Please try again.')
      })
      .then(() => {
        
        // Sets "isLoading" back to false
        this.setState({
          isLoading: false
        })

        // Sets timeout duration
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }
  
  // Defines what is displayed
  render() {
    const { id, name, description } = this.props.crate
    const { isLoading } = this.state

    return (
      <Card style={{ width: '18em', backgroundColor: white }}>
        <p style={{ padding: '2em 3em 0 3em' }}>
          <img src={`${ APP_URL }/images/crate.png`} alt={name} style={{ width: '100%' }}/>
        </p>

        <div style={{ padding: '1em 1.2em' }}>
          <H4 font="secondary" style={{ color: black }}>{name}</H4>

          <p style={{ color: grey2, marginTop: '1em' }}>{description}</p>

          <p style={{ textAlign: 'center', marginTop: '1.5em', marginBottom: '1em' }}>
            <Button
              theme="primary"
              onClick={this.onClickSubscribe.bind(this, id)}
              type="button"
              disabled={ isLoading }
            >
              <Icon size={1.2} style={{ color: white }}>add</Icon> Subscribe
            </Button>
          </p>
        </div>
      </Card>
    )
  }
}

// Defines requires props
// Component Properties
Item.propTypes = {
  crate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Handles itemState query
// Component State
function itemState(state) {
  return {
    user: state.user
  }
}

// Defines functions that can be imported into other files
export default connect(itemState, { create, messageShow, messageHide })(withRouter(Item))
