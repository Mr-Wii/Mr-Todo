import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import logo from '../Landing/logo.png'
const PasswordForgetPage = () => (
  <div>
    <aside class="profile-sign">
      <header>
        <img src={logo} alt="logo" className="shadowfilter" />
        <h1 className="form">Reset Password</h1>
      </header>
      <div class="profile-bio">
        <PasswordForgetForm />
      </div>
    </aside>
  </div>
)
const INITIAL_STATE = {
  email: '',
  error: null
}
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { email } = this.state
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { email, error } = this.state
    const isInvalid = email === ''
    return (
      <div class="form">
        <div class="form-panel one ">
          <div class="form-content">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <button disabled={isInvalid} type="submit">
                  Reset My Password
                </button>
                <Link to={ROUTES.SIGN_IN} style={{ width: '100%' }}>
                  <button
                    style={{
                      backgroundColor: '#865748'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                {error && <p>{error.message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const PasswordForgetLink = () => (
  <span>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </span>
)
export default PasswordForgetPage
const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export { PasswordForgetForm, PasswordForgetLink }
