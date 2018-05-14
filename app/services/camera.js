import Service from '@ember/service';
import { get, set } from '@ember/object';
import { reads, equal } from '@ember/object/computed';

export default Service.extend({
  isLive: reads('stream.active'),
  constraints: {
    audio: true,
    video: true
  },
  options: {
    record: { mimeType: 'video/webm;codecs=vp9' }
  },
  stream: null,
  recorder: null, 
  isRecording: equal('recorder.state', 'live'),
  recordedBlobs:[], 
  element: {},
  start(element){
    const constraints = get(this, 'constraints');
    
    set(this, 'element', element);

    const success = this._handleSuccess; 
    const error = this._handleError;

    navigator.mediaDevices.getUserMedia(constraints)
      .then(success.bind(this))
      .catch(error.bind(this));
  },
  startRecording() {
    const stream = get(this, 'stream');
    const options = get(this, 'options.record');
    const recorder = new MediaRecorder(stream, options);

    set(this, 'recorder', recorder);

    recorder.onstop = () => {
      set(this, 'isRecording', false); 
    };
    recorder.ondataavailable = this._handleRecordDataAvailable.bind(this);

    recorder.start(10);

    set(this, 'isRecording', true);
  },
  stopRecording(){
    const recorder = get(this, 'recorder'); 

    if(recorder && recorder.state !== 'inactive'){
      recorder.stop();
    }
  },
  stop(){
    get(this, 'stream')
    .getTracks()
    .forEach(track => {
      track.stop();
    });
  },
  download() {
    const blobs = get(this, 'recordedBlobs');
    var blob = new Blob(blobs, { type: 'video/webm' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);

    set(this, 'recordedBlobs', []);
  },
  _handleError(message, error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      this.set('error', 'The resolution ' + get(this, 'constraints.video.width.exact') + 'x' +
          get(this, 'constraints.video.width.exact') + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      this.set('error', 'Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.');
    }
  },
  _handleSuccess(stream) {

    let videoTracks = stream.getVideoTracks();
    stream.oninactive = function() {
      console.log('Stream inactive');
    };

    set(this, 'stream', stream);
    set(this, 'element.srcObject', stream);
    
  }, 
  _handleRecordDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      let blobs = get(this, 'recordedBlobs'); 
      blobs.pushObject(event.data);
    }
  }
});
