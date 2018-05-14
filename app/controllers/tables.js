import Controller from '@ember/controller';
import Table from 'ember-light-table';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  hasSelection: computed.notEmpty('table.selectedRows'),
  dir: 'asc',
  sort: 'name',
  sortedValue: computed('dir', 'sort', function(){
    return [`${this.get('sort')}:${this.get('dir')}`];
  }),
  sortedModel: sort('model', 'sortedValue'),
  columns: computed(function() {
    return [
    {
      width: '40px',
      sortable: false,
      cellComponent: 'ui/table-row-selection-indicator'
    },
    {
      label: 'Type',
      valuePath: 'type',
      width: '60px',
      sortable: true
    }, {
      label: 'Name',
      valuePath: 'name', 
      sortable: true,
    }, {
      label: 'Size',
      valuePath: 'size',
      width: '150px'
    }];
  }),
  table: computed('sortedModel', function() {
   return new Table(this.get('columns'), this.get('sortedModel'));
  }), 
  actions: {
    clear(){
      this.get('table.selectedRows').setEach('selected', false);
    },
    onColumnClick(column) {
      console.log('clicked');
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 0
        });
      }
    }
  }
});
