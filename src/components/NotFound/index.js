import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680514564/notfound_th1mxh.jpg"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found. Please go back to
      the home page.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
