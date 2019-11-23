/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import logo from './logo.png'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import './style.css'

const App = () => (
  <div class="container h-100">
    <aside class="profile-card">
      <header>
        <img src={logo} className="shadowfilter" />
        <h1>Hello</h1>
      </header>
      <div class="profile-bio">
        <p className="lineT">Weclome to Mr Todo</p>
        <p className="lineT">A simple yet amazing Todo App</p>
      </div>
      <div className="wrappaa">
        <Link to={ROUTES.SIGN_IN}>
          <button id="button">Get Started</button>
        </Link>
      </div>
    </aside>
  </div>
)
export default App
