import Component from '@ember/component';

export default Component.extend({
  tagName:'button',
  classNames:[
    'rounded',
    'bg-seismic-slate hover:bg-seismic-sterling',
    /*text*/'text-white',
    'px-3 py-2 mr-1',
    'uppercase',
    'text-sm'
  ]
});
