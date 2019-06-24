import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from 'components/sidebar/Sidebar'
import Tagbar from 'components/sidebar/Tagbar'
import Feed from 'containers/Feed'
import Suggested from 'components/sidebar/Suggested'
import Footer from 'components/sidebar/Footer'
import { fetchCollections, deleteCollection, createCollection } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './store/homeActions'
import { useDispatch } from 'react-redux'

const Home = props => {
  const {
    auth,
    user,
    feed,
    following,
    followers,
    suggested,
    topTags,
    myTags,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    followAUser,
    fetchFeed,
    fetchMoreFeed,
    fetchTopTags,
    fetchMyTags,
  } = props
  const dispatch = useDispatch()

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
      fetchSuggested(auth.id)
    }
    if (!topTags.length) {
      fetchTopTags()
      fetchMyTags()
    }
    fetchFeed()

    return () => dispatch({ type: 'RESET_POSTS' })
  }, [])

  return (
    <Container>
      <WrapperLeft>
        <Sidebar
          auth={auth}
          user={user}
          posts={feed.posts}
          followers={followers}
          following={following}
        />
        <Tagbar topTags={topTags} myTags={myTags} />
      </WrapperLeft>
      <Feed
        {...props}
        posts={feed.posts}
        hasmore={feed.hasmore}
        fetchMoreFeed={fetchMoreFeed}
        offset={feed.offset}
      />
      <WrapperRight>
        <Suggested
          auth={auth}
          suggested={suggested}
          fetchSuggested={fetchSuggested}
          fetchFollowing={fetchFollowing}
          followAUser={followAUser}
        />
        <Footer />
      </WrapperRight>
    </Container>
  )
}
const mapStateToProps = ({ auth, user, home, social }) => ({
  auth,
  user,
  feed: home,
  topTags: home.topTags,
  myTags: home.myTags,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 15px auto 0px;
  padding: 0 15px 30px;
  /* SidebarRight vanishes */
  @media (max-width: 1180px) {
    justify-content: space-around;
  }
  /* SidebarLeft vanished */
  @media (max-width: 920px) {
    margin: -1px auto;
  }
  /* Mobile-Feed 100% width */
  @media (max-width: 620px) {
    padding: 0;
  }
`
const WrapperLeft = styled.div`
  position: relative;
  width: 280px;
  transition: opacity 300ms ease;
  opacity: 1;
  @media (max-width: 920px) {
    opacity: 0;
    display: none;
  }
`

const WrapperRight = styled.div`
  position: relative;
  width: 260px;
  opacity: 1;
  transition: opacity 300ms ease;
  @media (max-width: 1180px) {
    opacity: 0;
    display: none;
  }
`
