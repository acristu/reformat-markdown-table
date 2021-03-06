'use strict';

var utils = require('./utils.js');


module.exports = reformat;


function reformat(str, delimiter) {
  if (undefined === delimiter) {
    delimiter = '|';
  }

  var table = utils.splitStringToTable(str, delimiter),
      alignments,
      max_length_per_column,
      hasHeaderSeparator = false,
      extraSpaceOnCells = true,
      extraDelimiterOnRows = true;

  if (table.length <= 1) {
    return str;//only one line, there is nothing to align
  }

  hasHeaderSeparator = (table[1].join('').match(/^[-:\s]+$/) != null);
  extraSpaceOnCells = hasHeaderSeparator;
  extraDelimiterOnRows = (hasHeaderSeparator && delimiter !== '\t');

  if (hasHeaderSeparator) {
    table[1] = table[1].map(function(cell) {
      return utils.padHeaderSeparatorString(cell, 0);
    });
  }

  utils.fillInMissingColumns(table);

  alignments = table[1].map(utils.getAlignment);
  max_length_per_column = utils.getMaxLengthPerColumn(table);

  return table.map(function(row, row_index) {
    return (extraDelimiterOnRows ? delimiter : '') + row.map(function(cell, column_index) {
      var column_length = max_length_per_column[column_index];
      if (row_index === 1 && hasHeaderSeparator) {
        return utils.padHeaderSeparatorString(cell, column_length + 2);
      }
      return (extraSpaceOnCells ? ' ' : '') + utils.padStringWithAlignment(cell, column_length, alignments[column_index]) + (extraSpaceOnCells ? ' ' : '');
    }).join(delimiter) + (extraDelimiterOnRows ? delimiter : '');
  }).join('\n') + '\n';
}
