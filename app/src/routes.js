export default {
  '/' : {
    component : require( './components/ProjectListView' ),
    name      : 'project-list-page'
  },
  '/projects/:projectIndex' : {
    component : require( './components/ProjectView' ),
    name      : 'project-page'
  }
};
