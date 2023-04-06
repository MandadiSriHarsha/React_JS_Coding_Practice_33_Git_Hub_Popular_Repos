import './index.css'

const LanguageFilterItem = props => {
  const {data, selected, changeLanguageFilterItem} = props
  const applyFilterClass = selected ? 'apply-outline' : ''

  const changeFilterItem = () => {
    changeLanguageFilterItem(data.id)
  }

  return (
    <li className="filter-item">
      <button
        className={`filter-button ${applyFilterClass}`}
        type="button"
        onClick={changeFilterItem}
      >
        {data.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
