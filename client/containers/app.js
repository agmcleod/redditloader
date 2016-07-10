import React from 'react';
import { connect } from 'react-redux';
import { loadSubredditNames, loadPosts } from '../subreddits';
import SubredditSelect from '../components/subreddit_select';

class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    isFetching: React.PropTypes.bool,
    loadPosts: React.PropTypes.func.isRequired,
    loadSubredditNames: React.PropTypes.func.isRequired,
    posts: React.PropTypes.array.isRequired,
    subreddits: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSubredditNames();
  }

  _renderPostPreview(preview) {
    const resolution = preview.source;
    return <img src={resolution.url} className='preview-image' />;
  }

  render() {
    return (
      <div className='container'>
        <h1>Reddit</h1>
        {this.props.isFetching ? <p>Loading</p> : null}
        <SubredditSelect subreddits={this.props.subreddits} loadPosts={this.props.loadPosts} />
        <div className='posts'>
          {this.props.posts.map((post) => {
            return (
              <div className='post' key={post.permalink}>
                <h3><a href={post.url} target='_blank'>{post.title}</a></h3>
                {post.preview ? this._renderPostPreview(post.preview) : null}
                <p><a href={`http://reddit.com${post.permalink}`} target='_blank'>Permalink</a></p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    posts: state.subredditsReducer.posts,
    subreddits: state.subredditsReducer.subreddits,
    isFetching: state.subredditsReducer.isFetching
  };
}, {
  loadSubredditNames, loadPosts
})(App);
