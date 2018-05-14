import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    primary(){
      alert('primary!');
    },
    secondary(){
      alert('secondary!');
    }, 
    link(){
      alert('link!');
    }
  }
});
