import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | rtc/camera', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:rtc/camera');
    assert.ok(route);
  });
});
