import {withRouter} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const clickBook = () => {
    const {bookDetails} = props
    const {id} = bookDetails
    const {history} = props
    history.push(`/books/${id}`)
  }

  const {bookDetails} = props
  const {title, readStatus, rating, authorName, coverPic} = bookDetails

  return (
    <li className="books-list">
      <button type="button" className="book-button" onClick={clickBook}>
        <img src={coverPic} alt={title} className="book-coverPic" />
      </button>
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
  )
}

export default withRouter(BookItem)
