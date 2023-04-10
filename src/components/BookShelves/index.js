import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import BookItem from '../BookItem'
import LeftNavbar from '../LeftNavbar'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const booksApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    booksData: [],
    searchText: '',
    booksApi: booksApiStatus.initial,
    bookshelfName: bookshelvesList[0].value,
    activeFilterLabel: bookshelvesList[0].label,
    activeFilterId: bookshelvesList[0].id,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getListOfBooks = booksList =>
    booksList.map(eachBook => ({
      id: eachBook.id,
      title: eachBook.title,
      readStatus: eachBook.read_status,
      rating: eachBook.rating,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
    }))

  getBooksData = async () => {
    this.setState({booksApi: booksApiStatus.inProgress})

    const {searchText, bookshelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        books: this.getListOfBooks(data.books),
        total: data.total,
      }
      this.setState({booksData: updatedData, booksApi: booksApiStatus.success})
      console.log(updatedData)
    } else {
      this.setState({booksApi: booksApiStatus.failure})
    }
  }

  changeInput = event => {
    this.setState({searchText: event.target.value})
  }

  clickRetry = () => {
    this.getBooksData()
  }

  searchBook = () => {
    this.setState(
      prevState => ({searchText: prevState.searchText}),
      this.getBooksData,
    )
  }

  keyDown = event => {
    if (event.key === 'Enter') {
      this.searchBook()
    }
  }

  renderSearchInput = () => {
    const {searchText} = this.state

    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchText}
          onChange={this.changeInput}
          onKeyDown={this.keyDown}
        />
        <button
          type="button"
          className="search-icon-button"
          testid="searchButton"
          onClick={this.searchBook}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderListOfBooks = () => {
    const {booksData} = this.state
    const {books} = booksData

    return (
      <ul className="books-list-container">
        {books.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  renderNoMatchingBooks = () => {
    const {searchText} = this.state

    return (
      <div className="no-match-container">
        <img
          src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680626322/nomatchfound_k7vzxa.jpg"
          alt="no books"
          className="no-books-image"
        />
        <p className="no-books-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksSuccess = () => {
    const {booksData} = this.state
    const {total} = booksData
    if (total !== 0) {
      return <>{this.renderListOfBooks()}</>
    }
    return <>{this.renderNoMatchingBooks()}</>
  }

  renderBooksInProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksFailure = () => (
    <div className="book-page-failure-container">
      <img
        src="https://res.cloudinary.com/dwswlczpp/image/upload/v1680369278/homepagefailure_lgrr26.jpg"
        alt="failure view"
        className="book-failure-image"
      />
      <p className="book-failure-text">
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

  renderBooks = () => {
    const {booksApi} = this.state
    switch (booksApi) {
      case booksApiStatus.success:
        return <>{this.renderBooksSuccess()}</>
      case booksApiStatus.inProgress:
        return <>{this.renderBooksInProgress()}</>
      case booksApiStatus.failure:
        return <>{this.renderBooksFailure()}</>
      default:
        return null
    }
  }

  getFilteredBooksList = (id, value, label) => {
    this.setState(
      {activeFilterId: id, activeFilterLabel: label, bookshelfName: value},
      this.getBooksData,
    )
  }

  render() {
    const {activeFilterLabel, activeFilterId} = this.state

    return (
      <>
        <Header shelves />
        <div>
          <div className="bookshelves-container">
            <div className="navbar-items">
              <h1 className="bookshelf-heading">Bookshelves</h1>
              <ul className="left-navbar-filter-container">
                {bookshelvesList.map(eachItem => (
                  <LeftNavbar
                    filterList={eachItem}
                    key={eachItem.id}
                    isActive={eachItem.id === activeFilterId}
                    getFilteredBooksList={this.getFilteredBooksList}
                  />
                ))}
              </ul>
            </div>
            <div className="bookshelves-filter-books-container">
              <div className="header-section">
                <h1 className="all-books-heading">{activeFilterLabel} Books</h1>
                <div>{this.renderSearchInput()}</div>
              </div>
              <div>{this.renderBooks()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookShelves
