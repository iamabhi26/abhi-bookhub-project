import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const topRatedApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedBooks: [], topRatedBooksApiStatus: topRatedApiStatus.initial}

  componentDidMount() {
    this.getTopRatedBooksData()
  }

  getTopRatedBooksData = async () => {
    this.setState({topRatedBooksApiStatus: topRatedApiStatus.inProgress})

    const topRatedBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedBooksList = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedBooks: updatedBooksList,
        topRatedBooksApiStatus: topRatedApiStatus.success,
      })
    } else {
      this.setState({topRatedBooksApiStatus: topRatedApiStatus.failure})
    }
  }

  clickRetry = () => {
    this.getTopRatedBooksData()
  }

  renderSliderSuccess = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, authorName, coverPic, title} = eachBook
          const clickBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div className="book-slider-container" key={id}>
              <button
                type="button"
                onClick={clickBook}
                className="books-button"
              >
                <div className="book-thumbnail-container">
                  <img src={coverPic} alt={title} className="book-thumbnail" />
                  <h1 className="book-title">{title}</h1>
                  <p className="book-author">{authorName}</p>
                </div>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSliderInProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSliderFailure = () => (
    <div className="home-page-failure-container">
      <img
        src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680369278/homepagefailure_lgrr26.jpg"
        alt="failure view"
        className="home-failure-image"
      />
      <p className="home-failure-text">
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

  renderSlider = () => {
    const {topRatedBooksApiStatus} = this.state

    switch (topRatedBooksApiStatus) {
      case topRatedApiStatus.success:
        return <>{this.renderSliderSuccess()}</>
      case topRatedApiStatus.inProgress:
        return <>{this.renderSliderInProgress()}</>
      case topRatedApiStatus.failure:
        return <>{this.renderSliderFailure()}</>
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header home />
        <div className="home-container">
          <div className="home-text-container">
            <h1 className="question-text">Find Your Next Favorite Books?</h1>
            <p className="home-page-text">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button type="button" className="find-books-mobile-button">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slider-container">
            <div className="slider-heading-container">
              <h1 className="slider-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button type="button" className="find-books-desktop-button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="slick-container">{this.renderSlider()}</div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
