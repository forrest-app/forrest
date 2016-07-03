export default {
  '/' : {
    component : require( './components/RepoListView' ),
    name      : 'repo-list-page'
  },
  '/repos/:repoName' : {
    component : require( './components/RepoView' ),
    name      : 'repo-page'
  }
};
