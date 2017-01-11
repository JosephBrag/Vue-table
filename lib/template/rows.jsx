module.exports = function(h, that) {
    var rows = [];
    var columns;
    var rowKey = that.opts.childRowKey;
    var rowClass;
    var data = that.source=='client'?that.filteredData:that.tableData;

    data.map(function(row, index) {
      columns = [];

      if (that.opts.childRow)
       columns.push(<td><span on-click={that.toggleChildRow.bind(that,row[rowKey])} class={`VueTables__child-row-toggler ` + that.childRowTogglerClass(row[rowKey])}></span></td>);

      that.allColumns.map(function(column) {
          columns.push(<td>
            {that.render(row, column, h)}
        </td>)
      }.bind(that))

      rowClass = that.opts.rowClassCallback?that.opts.rowClassCallback(row):'';

      rows.push(<tr class={rowClass} on-click={that.rowWasClicked.bind(that, row)}>{columns} </tr>);

      if (that.opts.childRow && this.rowsToggleState['row_' + row[rowKey]]) {
        let childRow = that.opts.childRow;
        let template = typeof childRow==='function'?
        childRow.apply(that, [h, row]):
        h(childRow,{
              attrs:{
                data: row
            }
          });
        rows.push(<tr class={`VueTables__child-row ` + that.childRowClass(row[rowKey])}><td colspan={that.allColumns.length+1}>{template}</td></tr>);
      }

    }.bind(that))

    return rows;

}

