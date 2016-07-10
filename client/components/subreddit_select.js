import React from 'react';

export default class SubredditSelect extends React.Component {
  static displayName = 'SubredditSelect';
  static defaultProps = {
    subreddits: []
  };
  static propTypes = {
    loadPosts: React.PropTypes.func.isRequired,
    subreddits: React.PropTypes.array
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.subreddits !== this.props.subreddits) {
      this.props.loadPosts(nextProps.subreddits[0]);
    }
  }

  _onChange(e) {
    this.props.loadPosts(e.target.value);
  }

  render() {
    return (
      <select onChange={this._onChange.bind(this)}>
        {this.props.subreddits.map((subreddit) => {
          return <option key={subreddit} value={subreddit}>{subreddit}</option>;
        })}
      </select>
    );
  }
}
