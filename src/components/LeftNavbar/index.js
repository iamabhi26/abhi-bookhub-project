import './index.css'

const LeftNavbar = props => {
  const {filterList, getFilteredBooksList, isActive} = props
  const {id, value, label} = filterList
  const selectedStatus = isActive && `selected-status`

  const clickStatus = () => {
    getFilteredBooksList(id, value, label)
  }

  return (
    <li className="filters-list">
      <button
        type="button"
        className={`navbar-filters-button ${selectedStatus}`}
        onClick={clickStatus}
      >
        {label}
      </button>
    </li>
  )
}

export default LeftNavbar
