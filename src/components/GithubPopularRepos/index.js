import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    initialFilterItem: languageFiltersData[0].id,
    repositoriesList: [],
    isLoaderLoading: false,
    isFetchSuccess: true,
  }

  componentDidMount() {
    this.fetchRepositoryData()
  }

  fetchRepositoryData = async () => {
    this.setState({isLoaderLoading: true})
    const {initialFilterItem} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${initialFilterItem}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedRespositoriesList = data.popular_repos.map(eachitem => ({
        name: eachitem.name,
        id: eachitem.id,
        issuesCount: eachitem.issues_count,
        forksCount: eachitem.forks_count,
        starsCount: eachitem.stars_count,
        avatarUrl: eachitem.avatar_url,
      }))
      this.setState({
        repositoriesList: updatedRespositoriesList,
        isLoaderLoading: false,
        isFetchSuccess: true,
      })
    } else if (response.status === 401) {
      this.setState({isFetchSuccess: false})
    }
  }

  changeLanguageFilterItem = id => {
    this.setState({initialFilterItem: id}, this.fetchRepositoryData)
  }

  renderSuccessCard = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repositories-bg-container">
        {repositoriesList.map(eachrepo => (
          <RepositoryItem key={eachrepo.id} repoData={eachrepo} />
        ))}
      </ul>
    )
  }

  renderFailureCard = () => <h1>Failed</h1>

  renderRepos = () => {
    const {isFetchSuccess} = this.state
    const returnCard = isFetchSuccess
      ? this.renderSuccessCard()
      : this.renderFailureCard()
    return returnCard
  }

  renderLanguageFilterItems = () => {
    const {initialFilterItem} = this.state
    return (
      <ul className="language-filter-items-container">
        {languageFiltersData.map(eachitem => (
          <LanguageFilterItem
            key={eachitem.id}
            data={eachitem}
            selected={eachitem.id === initialFilterItem}
            changeLanguageFilterItem={this.changeLanguageFilterItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoaderLoading} = this.state
    return (
      <div className="github-popular-repos-bg-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFilterItems()}
        {isLoaderLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderRepos()
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
