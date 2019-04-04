import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { editModalDisplay } from '../actions/index';

class EditModal extends Component {
  state = {
    postDescription: '',
    post_url: '',
    title: ''
  };
  componentDidMount() {
    console.log(this.props.modalOpen);
  }

  handleModalState = () => {
    // this.setState({
    //   modalOpen: !this.state.modalOpen
    // });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('posted woohoo');
    const editedPost = {
      post_url: this.state.post_url,
      description: this.state.postDescription,
      title: this.state.postTitle
    };
  };
  render() {
    const EditModal = styled.div`
      width: 100vw;
      height: 100vh;
      position: fixed;
      background: rgba(0, 0, 0, 0.3);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 20000;
      .close-modal-x {
        position: absolute;
        top: 10px;
        right: -70px;
        color: red;
        font-size: 6rem;
        cursor: pointer;
        opacity: 0.5;
        transition: 200ms ease-out;
        &:hover {
          opacity: 1;
          transition: 200ms ease-in;
        }
      }
      .edit-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 700px;
        margin: auto;
        margin-top: 10%;
        color: #444;
        // border: 1px solid red;
        background: #fff;
        padding-bottom: 10px;
        border-radius: 15px;
        position: relative;
      }
      .edit-form input,
      .edit-form label,
      #post-description {
        width: 95%;
        margin: auto;
        border-radius: 6px;
      }
      .edit-form input {
        border: none;
        padding: 10px;
        margin-bottom: 15px;
        font-size: 1.6rem;
        border: 1px solid lightgrey;
        &:focus {
          outline: none;
        }
      }
      #edit-submit {
        background: #4163f2;
        border: none;
        color: #fff;
        padding: 10px 5px;
        border-radius: 6px;
        margin: 10px auto;
        font-size: 1.8rem;
        cursor: pointer;
      }
      .edit-form label {
        margin-bottom: 3px;
        font-size: 1.6rem;
      }
      .form-title {
        text-align: center;
        background: #4163f2;
        color: #fff;
        padding: 15px;
        margin-bottom: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        h3 {
          font-size: 2.1rem;
        }
      }
      #post-description {
        margin-bottom: 10px;
        resize: none;
        padding: 10px;
        font-size: 1.6rem;
        font-family: inherit;
        border: 1px solid lightgrey;
        &:focus {
          outline: none;
        }
      }
    `;
    return (
      <EditModal
        style={{
          display: this.props.modalOpen ? 'block' : 'none'
        }}
      >
        <form className="edit-form" onSubmit={this.onSubmit}>
          <span onClick={this.props.editModalDisplay} className="close-modal-x">
            &times;
          </span>
          <div className="form-title">
            <h3>Edit Post</h3>
          </div>
          <label htmlFor="Post Url">Post Url</label>
          <input type="text" />
          <label htmlFor="Post Url">Post Title</label>
          <input type="text" />
          <label htmlFor="Post Description">Post Description</label>
          <textarea
            name="post_description"
            id="post-description"
            cols="30"
            rows="10"
          />
          <input type="submit" id="edit-submit" value="Update Post" />
        </form>
      </EditModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpen: state.modalState.editModalOpen
  };
};
export default connect(
  mapStateToProps,
  { editModalDisplay }
)(EditModal);
