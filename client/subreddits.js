import 'whatwg-fetch';

const LOADING = 'LOADING';
const RECEIVE_NAMES = 'RECEIVE_NAMES';
const RECEIVE_POSTS = 'RECEIVE_POSTS';

export default function reducer(state = { isFetching: false, subreddits: [], posts: []}, action) {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_NAMES:
      return Object.assign({}, state, { isFetching: false, subreddits: action.data });
    case RECEIVE_POSTS:
      return Object.assign({}, state, { isFetching: false, posts: action.data });
  }
  return state;
}

export function loadSubredditNames() {
  return (dispatch) => {
    dispatch({ type: LOADING });
    return fetch('/subreddits')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: RECEIVE_NAMES, data: json });
      });
  };
}

export function loadPosts(name) {
  return (dispatch) => {
    dispatch({ type: LOADING });
    return fetch(`/subreddits/${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: RECEIVE_POSTS, data: json });
      });
  };
}
