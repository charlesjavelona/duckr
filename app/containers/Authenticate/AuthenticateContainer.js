import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  propTypes: {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
    .then(() => this.context.router.replace('feed'))
  },
  render () {
    console.log('Is Fetching', this.props.isFetching)
    return (
      <Authenticate 
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  },
})

/*Return current state
function mapStateToProps (state) {
 // console.log('state', state)
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}
*
//Bind actionCreators with dispatch to reduce typing this.props.dispatch(action)
function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}
*/

//Invoke connect() and connect AuthenticateContainer to redux
export default connect(
  (state) => ({isFetching: state.isFetching, error: state.error}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
