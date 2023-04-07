import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <img
          src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680243470/loginpage_usduxl.jpg"
          alt="login website logo"
          className="login-website-logo"
        />
        <img
          src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680247811/loginpagemobile_xyshvk.jpg"
          alt="login website logo"
          className="login-website-mobile-logo"
        />
        <div className="login-details">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680244101/bookhublogo_azjgxm.jpg"
              alt="website login"
              className="website-login"
            />
            <div className="input-container">
              <label htmlFor="username" className="label-name">
                Username*
              </label>
              <input
                type="text"
                id="username"
                className="input"
                onChange={this.changeUsername}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-name">
                Password*
              </label>
              <input
                type="password"
                id="password"
                className="input"
                onChange={this.changePassword}
                value={password}
                placeholder="Password"
              />
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
