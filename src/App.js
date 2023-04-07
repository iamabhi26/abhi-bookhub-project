import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import BookDetails from './components/BookDetails'
import BookShelves from './components/BookShelves'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
