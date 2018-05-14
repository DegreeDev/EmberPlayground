import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return [
      {
        type: 'word',
        name: 'Content Automation & Personalization with Seismic', 
        size: '414kb'
      },
      {
        type: 'excel',
        name: 'Content Automation & Personalization with Seismic 2', 
        size: '414kb'
      },
    ]
  }
});
