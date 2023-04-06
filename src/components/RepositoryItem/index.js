import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="repo-heading">{name}</h1>
      <div className="stars-container repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-details-container-image"
        />
        <p className="repo-details-container-text">{starsCount}</p>
      </div>
      <div className="forks-container repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-details-container-image"
        />
        <p className="repo-details-container-text">{forksCount}</p>
      </div>
      <div className="open-issues-container repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-details-container-image"
        />
        <p className="repo-details-container-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
