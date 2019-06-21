import React, { Component } from 'react'
import styled from 'styled-components'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import CommentBox from '../comments'
import FeedBar from './FeedBar'
import CardActionBar from 'pages/Browse/components/CardActionBar'
import CardAttributionBar from 'pages/Browse/components/CardAttributionBar'

class PostContainer extends Component {
  handleSaveToProfile = post => {
    const { title, url, description, thumbnail_url } = post
    this.props.createCollection({
      title,
      description,
      thumbnail_url,
      post_url: url,
      type: 'link',
    })
  }

  displayMedia = post => {
    const { url, thumbnail_url } = post
    if (url && url.includes('youtube.com/watch')) {
      const videoId = url.split('=')[1]
      return (
        <div
          style={{
            overflow: 'hidden',
            paddingTop: '56.25%',
            position: 'relative',
          }}
        >
          <iframe
            style={{
              border: '0px',
              height: '100%',
              left: '0px',
              position: 'absolute',
              top: '0px',
              width: '100%',
            }}
            frameBorder='0'
            width='560'
            height='315'
            title={videoId}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )
    } else if (
      thumbnail_url.includes('google') ||
      thumbnail_url.includes('cloudfront')
    ) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className='post-hero'
            style={{
              overflow: 'hidden',
              height: '350px',
              position: 'relative',
              backgroundImage: `url(${thumbnail_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `blur(1.5rem)`,
            }}
          />
          <div
            style={{
              overflow: 'hidden',
              height: '170px',
              width: '100%',
              position: 'absolute',
              top: '90px',
              justifySelf: 'center',
              backgroundImage: `url(${thumbnail_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              transform: `scale(1.3)`,
            }}
          />
        </div>
      )
    } else {
      return (
        <div
          style={{
            overflow: 'hidden',
            paddingTop: '56.25%',
            position: 'relative',
            backgroundImage: `url(${thumbnail_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )
    }
  }

  render() {
    const {
      post,
      user_id,
      username,
      handleSubmit,
      handleClick,
      handlePony,
      profile_picture,
      handleDeleteComment,
      className,
    } = this.props
    return (
      <Container>
        <PostHeader post={post} />
        <div className='post-cover'>
          {post.thumbnail_url ? (
            <a href={post.url} target='_blank' rel='noopener noreferrer'>
              {this.displayMedia(post)}
            </a>
          ) : null}
        </div>
        <PostContent post={post} />
        <div className='post-bar'>
          <FeedBar
            user_id={user_id}
            username={username}
            post={post}
            handleClick={handleClick}
            handlePony={handlePony}
          />
          <ActionBar insertItem={post} className={className} />
        </div>
        <CommentBox
          post_comments={post.comments}
          post_id={post.id}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          profile_picture={profile_picture}
          handleDeleteComment={handleDeleteComment}
          user_id={user_id}
          postOwnerId={post.user_id}
        />
      </Container>
    )
  }
}

export default PostContainer

const Container = styled.div`
  position: relative;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: #fff;

  .post-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6ecf0;
    padding-bottom: 8px;
  }
`

const ActionBar = styled(CardActionBar)`
  position: relative;
  bottom: 4px;
`
