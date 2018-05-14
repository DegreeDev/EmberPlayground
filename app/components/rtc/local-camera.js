import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads, notEmpty } from '@ember/object/computed';
import { computed, get, set } from '@ember/object'

export default Component.extend({
  camera: service(),
  hasRecording: notEmpty('camera.recordedBlobs'),
  isRecording: reads('camera.isRecording'),
  isLive: reads('camera.isLive'),
  canDownload: computed('hasRecording', 'isRecording', function(){
    return get(this, 'hasRecording') && !get(this, 'isRecording');
  }),
  willDestroyElement() {
    this.send('stop');
  }, 
  actions: {
    start(){
      const video = this.$('video')[0];
      get(this, 'camera').start(video);
    },
    stop(){
      get(this, 'camera').stop();
    },
    startRecording(){
      get(this, 'camera').startRecording();
    }, 
    stopRecording(){
      get(this, 'camera').stopRecording();
    }, 
    downloadRecording(){
      get(this, 'camera').download();
    }

  }
});
