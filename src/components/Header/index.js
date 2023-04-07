import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  clickMenu = () => {
    this.setState(prevState => ({
      displayNavbar: !prevState.displayNavbar,
    }))
  }

  clickCross = () => {
    this.setState({displayNavbar: false})
  }

  clickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  clickWebSiteLogo = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {home, shelves} = this.props
    const activeHome = home ? 'active-tab' : ''
    const activeShelves = shelves ? 'active-tab' : ''
    const {displayNavbar} = this.state

    return (
      <div>
        <div className="header-desktop-container">
          <div className="header-website-logo">
            <Link to="/">
              <>
                <img
                  className="header-website-logo"
                  src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680259450/homepagenavlogo_dzs7lx.jpg"
                  alt="website logo"
                  onClick={this.clickWebSiteLogo}
                />
              </>
            </Link>
          </div>
          <ul className="links-container">
            <li className={`list-item bookshelves-tab ${activeHome}`}>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>

            <li className={`list-item bookshelves-tab ${activeShelves}`}>
              <Link className="bookshelves-link" to="/shelf">
                Bookshelves
              </Link>
            </li>
            <li className="list-item">
              <button
                onClick={this.clickLogout}
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-mobile-container">
          <div className="header-nav-container">
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680259450/homepagenavlogo_dzs7lx.jpg"
                alt="website logo"
                onClick={this.clickWebSiteLogo}
              />
            </Link>
          </div>
          <button
            onClick={this.clickMenu}
            className="menu-button"
            type="button"
          >
            <FiMenu className="menu-icon" />
          </button>

          {displayNavbar && (
            <>
              <ul className="header-navbar-links-container">
                <li className={`home-tab ${activeHome}`}>
                  <Link className="link" to="/">
                    Home
                  </Link>
                </li>
                <li className={`bookshelves-tab ${activeShelves}`}>
                  <Link className="link" to="/shelf">
                    BookShelves
                  </Link>
                </li>
                <li>
                  <button
                    onClick={this.clickLogout}
                    className="logout-button"
                    type="button"
                  >
                    Logout
                  </button>
                </li>
                <button
                  onClick={this.clickCross}
                  className="cross-icon-button"
                  type="button"
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
