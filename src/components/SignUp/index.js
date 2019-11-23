import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import logo from '../Landing/logo.png'

const SignUpPage = () => (
  <div>
    <aside class="profile-sign">
      <header>
        <img src={logo} alt="logo" className="shadowfilter" />
        <h1 className="form">Sign Up</h1>
      </header>
      <div class="profile-bio">
        <SignUpForm />
      </div>
    </aside>
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        })
      })
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
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''
    return (
      <div class="form">
        <div class="form-panel one ">
          <div class="form-content">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  style={{ padding: '5px' }}
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  style={{ padding: '5px' }}
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <label for="passwordOne">Password</label>
                <input
                  style={{ padding: '5px', marginBottom: '6px' }}
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
                <input
                  style={{ padding: '5px' }}
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div class="form-group">
                <button
                  id="disables"
                  style={{
                    padding: '2px 8px'
                  }}
                  disabled={isInvalid}
                  type="submit"
                >
                  Sign Up
                </button>{' '}
                <Link to={ROUTES.SIGN_IN} style={{ width: '100%' }}>
                  <button
                    style={{
                      padding: '2px 8px',
                      backgroundColor: '#865748'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                {error && (
                  <span style={{ color: 'red', fontSize: '10px' }}>
                    {error.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const SignUpLink = () => (
  <span>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </span>
)

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage
export { SignUpForm, SignUpLink }
