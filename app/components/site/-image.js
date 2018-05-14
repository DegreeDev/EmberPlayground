import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Component.extend({
  mode: 'edit',
  isEdit: equal('mode', 'edit'),
  config: {
    layout: 'flex w-full w-1/3 h-3',
    src: '',
  }, 
  actions: {
    edit(){
      set(this, 'mode', 'edit');
    },
    save() {
      set(this, 'mode', 'view');
    }, 
    upload(input){
      const reader = new FileReader();
      reader.onload = (e) => {
        set(this, 'config.src', e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }
});
