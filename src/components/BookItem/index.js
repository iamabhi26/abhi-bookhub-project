import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails

  return (
    <Link to={`/books/${id}`} className="link-redirect">
      <li className="books-list">
        <img src={coverPic} alt={title} className="book-coverPic" />
        <div className="book-info">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <div className="rating-container">
            <p className="rating-heading">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="book-rating">{rating}</p>
          </div>
          <p className="book-status">
            Status : <span className="book-status-reading"> {readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
