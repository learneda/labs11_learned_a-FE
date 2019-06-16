import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/feed'
import Collections from 'components/collections'
import Locker from 'components/locker/Locker'
import Sidebar from 'components/sidebar/Sidebar'
import Suggested from 'components/sidebar/Suggested'
import { customWrapper } from 'components/mixins'
import { fetchCollections, deleteCollection, createCollection } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './homeActions'
const Home = props => {
  const {
    auth,
    user,
    searchTerm,
    locker,
    location,
    feed,
    collections,
    following,
    followers,
    suggested,
    fetchCollections,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    deleteCollection,
    followAUser,
    fetchFeed,
    fetchLocker,
    fetchMoreFeed,
    createCollection,
  } = props

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
      fetchSuggested(auth.id)
    }
    if (!collections.length) {
      fetchCollections()
    }
    // only fetch if feed post arr is length of zero
    if (!feed.posts.length) {
      fetchFeed()
    }
  }, [])

  return (
    <Container>
      <Sidebar
        user={user}
        collections={collections}
        followers={followers}
        following={following}
      />
      <Feed
        {...props}
        auth={auth}
        user={user}
        searchTerm={searchTerm}
        posts={feed.posts}
        hasmore={feed.hasmore}
        fetchMoreFeed={fetchMoreFeed}
        offset={feed.offset}
        createCollection={createCollection}
      />
      <Suggested
        auth={auth}
        suggested={suggested}
        fetchSuggested={fetchSuggested}
        fetchFollowing={fetchFollowing}
        followAUser={followAUser}
      />
    </Container>
  )
}
const mapStateToProps = ({
  auth,
  user,
  searchTerm,
  collections,
  home,
  social,
}) => ({
  auth,
  user,
  searchTerm,
  collections,
  feed: home,
  locker: home.locker,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    deleteCollection,
    createCollection,
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

const Container = styled.div`
  display: flex;
  postion: relative;
  justify-content: space-between;
  max-width: 1200px;
  margin: 10px auto 30px;
  @media (max-width: 1210px) {
    max-width: 900px;
  }
  @media (max-width: 910px) {
    max-width: 600px;
  }
`
