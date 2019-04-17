import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import axios from 'axios';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';

import { getCourses, getArticles, fetchUser } from '../actions';
import {
  customWrapper,
  customLayout,
  truncateText
} from '../components/mixins';
import { post as URL } from '../services/baseURL';
import { ReactComponent as Add } from '../assets/svg/add-icon.svg';
import { ReactComponent as Loading } from '../assets/svg/circles.svg';
axios.defaults.withCredentials = true;

class Browse extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getArticles();
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      axios.post(`${URL}/api/posts`, {
        post_url: url,
        id: this.props.auth.id
      });
    }
  };

  handleTruncateText = (content, limit = 10) => {
    return truncateText(content, limit);
  };

  render() {
    const { articles, courses } = this.props;

    return (
      <Grommet theme={theme}>
        <Wrapper>
          <BrowseContainer>
            <h2>Browse</h2>

            <Tabs justify="start" alignSelf="center">
              <Tab title="Courses">
                <Cards>
                  {courses.length === 0 ? (
                    <Loader>
                      <Loading />
                    </Loader>
                  ) : (
                    courses.map(course => (
                      <Card key={course.id}>
                        <a
                          href={`https://www.udemy.com${course.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={course.image_480x270}
                            alt="course-thumbnail"
                          />
                          <h3>{this.handleTruncateText(course.title)}</h3>
                          <p>{this.handleTruncateText(course.headline, 15)}</p>
                        </a>
                        <SaveIcon>
                          <Add
                            className="save-icon"
                            onClick={() => {
                              this.handleSaveLink(
                                `https://www.udemy.com${course.url}`
                              );
                              this.props.alert.success(
                                'Course added to Bookmarks'
                              );
                            }}
                          />
                        </SaveIcon>
                      </Card>
                    ))
                  )}
                </Cards>
              </Tab>

              <Tab title="Articles">
                <Cards>
                  {articles.length === 0 ? (
                    <Loader>
                      <Loading />
                    </Loader>
                  ) : (
                    articles.map(article => (
                      <Card key={article.created}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={article.thumbnail}
                            alt="article-thumbnail"
                          />

                          <h3>{this.handleTruncateText(article.title)}</h3>
                          <p>
                            {this.handleTruncateText(article.description, 15)}
                          </p>
                        </a>
                        <SaveIcon>
                          <Add
                            className="save-icon"
                            onClick={() => {
                              this.handleSaveLink(article.url);
                              this.props.alert.success(
                                'Article added to Bookmarks'
                              );
                            }}
                          />
                        </SaveIcon>
                      </Card>
                    ))
                  )}
                </Cards>
              </Tab>
            </Tabs>
          </BrowseContainer>
        </Wrapper>
      </Grommet>
    );
  }
}

const theme = {
  tab: {
    color: 'dark-1',
    active: {
      weight: 'bold'
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: {
        light: null
      },
      active: {
        color: {
          light: 'dark-1'
        }
      },
      hover: {
        color: {
          light: null
        }
      }
    },
    margin: {
      vertical: 'small',
      horizontal: 'xsmall'
    }
  }
};

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`;

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`;

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
`;

const Cards = styled.div`
  border-top: 1px solid #bdbdbd;
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 0 6px;
  margin-top: -12px;
  padding: 40px 0;
`;

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 22%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  @media (max-width: 1500px) {
    width: 30%;
  }
  @media (max-width: 960px) {
    width: 45%;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  a {
    &:hover {
      h3 {
        text-decoration: underline;
      }
    }
  }

  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    // border: 1px solid red;
    height: 50px;
    margin: 10px 0;
    padding: 0 3%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }

  p {
    padding: 0 3%;
    height: 45px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #6d767e;
  }
`;

const SaveIcon = styled.div`
  // border: 1px solid red;
  ${customLayout('flex-end')}
  margin-top: 15px;
  padding: 0 4%;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
`;

const mapStateToProps = state => {
  return {
    courses: state.browse.courses,
    articles: state.browse.articles,
    auth: state.auth
  };
};

const Alert = withAlert()(Browse);

export default connect(
  mapStateToProps,
  { getCourses, getArticles, fetchUser }
)(Alert);
