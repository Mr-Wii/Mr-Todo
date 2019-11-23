import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import logo from '../Landing/logo.png'
import './style.css'

const SignInPage = () => (
  <div>
    <aside class="profile-sign">
      <header>
        <img src={logo} alt="logo" className="shadowfilter" />
        <h1 className="form">Log In</h1>
      </header>
      <div class="profile-bio">
        <SignInForm />
        <SignUpLink />
      </div>
    </aside>
  </div>
)
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}
class SignInFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
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
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''
    return (
      <div class="form">
        <div class="form-panel one ">
          <div class="form-content">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="username"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                  required="required"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </div>
              <div class="form-group">
                <PasswordForgetLink />
              </div>
              <div class="form-group">
                <button disabled={isInvalid} type="submit">
                  Log In
                </button>
                {error && <span id="error">{error.message}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase)
export default SignInPage
export { SignInForm }
