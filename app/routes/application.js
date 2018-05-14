import Route from '@ember/routing/route';
import showdown from 'showdown';

export default Route.extend({
  beforeModel(){
    showdown.setFlavor('github');
  }
});
