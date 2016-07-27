export default {
  '/' : {
    component : require( './components/RepoListView' ),
    name      : 'repo-list-page'
  },
  '/repos/:repoName' : {
    component : require( './components/RepoView' ),
    name      : 'repo-page'
  },
  '/about' : {
    component : require( './components/AboutView' ),
    name      : 'about-page'
  },
  '/help' : {
    component : require( './components/HelpView' ),
    name      : 'help-page'
  }
};
