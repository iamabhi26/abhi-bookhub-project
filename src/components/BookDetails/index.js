import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookDetailsApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetailsData: {}, bookDetailsStatus: bookDetailsApiStatus.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({bookDetailsStatus: bookDetailsApiStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const bookDetailsUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(bookDetailsUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        bookDetails: {
          id: data.book_details.id,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          aboutBook: data.book_details.about_book,
          rating: data.book_details.rating,
          readStatus: data.book_details.read_status,
          title: data.book_details.title,
          aboutAuthor: data.book_details.about_author,
        },
      }
      this.setState({
        bookDetailsData: updatedData,
        bookDetailsStatus: bookDetailsApiStatus.success,
      })
      console.log(updatedData)
    } else {
      this.setState({bookDetailsStatus: bookDetailsApiStatus.failure})
    }
  }

  clickRetry = () => {
    this.getBookDetails()
  }

  renderBookDetailsInProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetailsFailure = () => (
    <div className="book-details-page-failure-container">
      <img
        src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680369278/homepagefailure_lgrr26.jpg"
        alt="failure view"
        className="book-details-failure-image"
      />
      <p className="book-details-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.clickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsSuccess = () => {
    const {bookDetailsData} = this.state
    const {bookDetails} = bookDetailsData
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <div className="book-details-container">
        <div className="book-details-card">
          <div className="image-section">
            <img src={coverPic} alt={title} className="book-details-image" />
            <div className="top-text-container">
              <h1 className="book-details-title">{title}</h1>
              <p className="book-details-author">{authorName}</p>
              <div className="rating-container">
                <p className="book-rating-heading">Avg Rating</p>
                <BsFillStarFill className="book-details-star-icon" />
                <p className="book-detail-rating">{rating}</p>
              </div>
              <p className="book-status-heading">
                Status: <span className="book-read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="book-text-container">
            <div>
              <h1 className="about-heading">About Author</h1>
              <p className="about-description">{aboutAuthor}</p>
            </div>
            <div>
              <h1 className="about-heading">About Book</h1>
              <p className="about-description">{aboutBook}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetailsStatus} = this.state

    switch (bookDetailsStatus) {
      case bookDetailsApiStatus.success:
        return <>{this.renderBookDetailsSuccess()}</>
      case bookDetailsApiStatus.inProgress:
        return <>{this.renderBookDetailsInProgress()}</>
      case bookDetailsApiStatus.failure:
        return <>{this.renderBookDetailsFailure()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderBookDetails()}</div>
        <Footer />
      </>
    )
  }
}

export default BookDetails
