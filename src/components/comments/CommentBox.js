import React, { Component } from 'react';

import MoreBtn from '../utils/MoreBtn';

import styled from 'styled-components';
import { customWrapper, customLayout } from '../mixins';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsToRender: -2
    };
  }

  handleMoreComments = e => {
    e.preventDefault();
    this.setState({
      commentsToRender: this.state.commentsToRender - 3
    });
    console.log('COMMENT TO RENDER', this.state.commentsToRender);
  };

  render() {
    const { post, handleSubmit, profile_picture, user_id } = this.props;
    return (
      <Container>
        <div className="comments-container">
          <div className="comment-box">
            {post.comments.length - 1 <
            Math.abs(this.state.commentsToRender) ? null : (
              <button
                className="show-more-btn"
                onClick={this.handleMoreComments}
              >
                show more comments
              </button>
            )}
            {post.comments
              .slice(this.state.commentsToRender)
              .map((comment, index) => {
                if (comment.user_id === user_id) {
                  return (
                    <div key={index} className="comment">
                      <div className="comment-text">
                        <h2>{comment.username}:</h2>
                        <span>{comment.content}</span>
                      </div>
                      <MoreBtn
                        getNewsFeed={this.getNewsFeed}
                        comment_id={comment.id}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="comment">
                      <div className="comment-text">
                        <h2>{comment.username}:</h2>
                        <span>{comment.content}</span>
                      </div>
                    </div>
                  );
                }
              })}
          </div>

          <div>
            <form className="add-comment">
              <img src={profile_picture} alt="" />
              <textarea
                placeholder="Add a comment..."
                type="text"
                onKeyUp={e => handleSubmit(e, post.post_id)}
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  handleSubmit(e, post.post_id);
                }}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  .comments-container {
    padding: 15px 25px;

    .add-comment {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      textarea {
        resize: none;
        align-items: center;
        padding: 5px;
        width: 100%;
        border-radius: 3px;
        border-color: lightgrey;
        height: 40px;
        font-size: 1.4rem;
        ::placeholder {
          /* border-bottom: 1px solid lightgrey; */
        }
        :focus {
          border: 1px solid #3f65f2;
          outline: none;
        }
      }

      button {
        border: 1px solid transparent;
        background-color: #3f65f2;
        color: white;
        border-radius: 5px;
        font-weight: 700;
        margin-left: 20px;
        padding: 8px 25px;
        font-size: 1.5rem;
      }
    }

    .more_btn {
      display: none;
    }

    .comment-box {
      margin-top: 10px;

      .show-more-btn {
        border: 1px solid transparent;
        color: #3f65f2;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        transition: 200ms ease-out;
        &:hover {
          color: #3059f3;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .comment {
      ${customLayout('space-between')}
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f3f4f7;
      border-radius: 5px;

      :nth-child(2) {
        margin-top: 10px;
      }
      &:hover {
        .more_btn {
          display: flex;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
        }
      }

      .comment-text {
        h2 {
          margin-right: 10px;
          color: #222;
          font-weight: 700;
          font-size: 1.4rem;
        }
        span {
          color: #222;
          opacity: 0.9;
          /* word-break: break-all; */
          overflow: hidden;
          width: 80%;
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default CommentBox;
