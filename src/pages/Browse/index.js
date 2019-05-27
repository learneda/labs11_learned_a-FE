import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { withAlert } from 'react-alert'
import styled from 'styled-components'
import Courses from 'components/browse/Courses'
import Articles from 'components/browse/Articles'
import Videos from 'components/browse/Videos'
import Books from 'components/browse/Books'
import Podcasts from 'components/browse/Podcasts'
import { withLayout } from 'components/hoc/withLayout'
import { createCollection } from 'actions'
import * as browseActions from './browseActions'
import { customWrapper, smartTruncate } from 'components/mixins'

const Browse = props => {
  const {
    auth,
    searchTerm,
    articles,
    courses,
    videos,
    books,
    podcasts,
    coursePage,
    articleOffset,
    videoPageToken,
    podcastOffset,
    bookOffset,
    fetchCourses,
    fetchArticles,
    fetchVideos,
    fetchBooks,
    fetchPodcasts,
    searchCourses,
    searchArticles,
    searchVideos,
    searchBooks,
    searchPodcasts,
    showIframe,
    resetIframe,
    createCollection,
    match,
    alert,
  } = props

  useEffect(() => {
    if (!courses.length) {
      fetchCourses(searchTerm, coursePage)
    }
    if (!articles.length) {
      fetchArticles(searchTerm, articleOffset)
    }
    if (!books.length) {
      fetchBooks(searchTerm, bookOffset)
    }
    if (!videos.length) {
      fetchVideos(searchTerm, videoPageToken)
    }
    if (!podcasts.length) {
      fetchPodcasts(searchTerm, podcastOffset)
    }
  }, [])

  const handleSaveLink = url => {
    if (auth) {
      createCollection({
        post_url: url,
      })
    }
  }

  const handleSaveMedia = media => {
    if (auth) {
      createCollection({
        ...media,
        user_id: auth.id,
      })
    }
  }

  return (
    <div>
      <Tabs>
        <Tab>
          <NavLink
            exact
            to={`${match.url}/courses`}
            className={props.location.pathname === '/browse' ? 'active' : null}
          >
            Course
          </NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/articles`}>Article</NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/videos`}>Video</NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/books`}>Book</NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/podcasts`}>Podcast</NavLink>
        </Tab>
      </Tabs>
      <TabWrapper>
        <Switch>
          <Route
            exact
            path={[`${match.path}`, `${match.path}/courses`]}
            render={props => (
              <Courses
                {...props}
                courses={courses}
                searchTerm={searchTerm}
                coursePage={coursePage}
                searchCourses={searchCourses}
                fetchCourses={fetchCourses}
                handleSaveLink={handleSaveLink}
                alert={alert}
              />
            )}
          />
          <Route
            path={`${match.path}/articles`}
            render={props => (
              <Articles
                {...props}
                articles={articles}
                searchTerm={searchTerm}
                articleOffset={articleOffset}
                searchArticles={searchArticles}
                fetchArticles={fetchArticles}
                handleSaveLink={handleSaveLink}
                alert={alert}
              />
            )}
          />
          <Route
            path={`${match.path}/videos`}
            render={props => (
              <Videos
                {...props}
                videos={videos}
                searchTerm={searchTerm}
                videoPageToken={videoPageToken}
                searchVideos={searchVideos}
                fetchVideos={fetchVideos}
                handleSaveMedia={handleSaveMedia}
                showIframe={showIframe}
                resetIframe={resetIframe}
                alert={alert}
              />
            )}
          />
          <Route
            path={`${match.path}/books`}
            render={props => (
              <Books
                {...props}
                books={books}
                searchTerm={searchTerm}
                bookOffset={bookOffset}
                searchBooks={searchBooks}
                fetchBooks={fetchBooks}
                handleSaveMedia={handleSaveMedia}
                alert={alert}
              />
            )}
          />
          <Route
            path={`${match.path}/podcasts`}
            render={props => (
              <Podcasts
                {...props}
                podcasts={podcasts}
                searchTerm={searchTerm}
                podcastOffset={podcastOffset}
                searchPodcasts={searchPodcasts}
                fetchPodcasts={fetchPodcasts}
                handleSaveMedia={handleSaveMedia}
                alert={alert}
              />
            )}
          />
        </Switch>
      </TabWrapper>
    </div>
  )
}

const mapStateToProps = ({ auth, searchTerm, browse }) => ({
  auth,
  searchTerm,
  ...browse,
})

const BrowseWithAlert = withLayout(withAlert()(Browse))

export default connect(
  mapStateToProps,
  {
    ...browseActions,
    createCollection,
  }
)(withRouter(BrowseWithAlert))

const TabWrapper = styled.div`
  padding-top: 20px;
`

const Tabs = styled.ul`
  display: flex;
  position: sticky;
  top: 59px;
  height: 80px;
  width: 100%;
  font-size: 1.8rem;
  z-index: 1;
  align-items: flex-end;
  background: rgb(230, 233, 243);
  padding-bottom: 25px;
  @media (max-width: 900px) {
    top: 50px;
  }
  &:hover {
    color: #4064f2;
  }
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
  @media (max-width: 400px) {
    font-size: 1.7rem;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
  font-size: 2rem;
  margin-left: 10px;

  a {
    transition: 100ms ease-out;
    &:hover {
      color: #4064f2;
      transition: 100ms ease-in;
    }
  }
`
