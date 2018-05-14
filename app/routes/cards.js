import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let model = []; 

    for(let i = 0; i < 30; i++) {
      model.push(i); 
    }

    return model;
  }
});
