'use strict';

var utils = require('./utils.js');


module.exports = reformat;


function reformat(str, delimiter) {
  if (undefined === delimiter) {
    delimiter = '|';
  }

  var table = utils.splitStringToTable(str, delimiter),
      alignments,
      max_length_per_column;

  table[1] = table[1].map(function(cell) {
    return utils.padHeaderSeparatorString(cell, 0);
  });

  utils.fillInMissingColumns(table);

  alignments = table[1].map(utils.getAlignment);
  max_length_per_column = utils.getMaxLengthPerColumn(table);

  return table.map(function(row, row_index) {
    return delimiter + row.map(function(cell, column_index) {
      var column_length = max_length_per_column[column_index];
      if (row_index === 1) {
        return utils.padHeaderSeparatorString(cell, column_length + 2);
      }
      return ' ' + utils.padStringWithAlignment(cell, column_length, alignments[column_index]) + ' ';
    }).join(delimiter) + delimiter;
  }).join('\n') + '\n';
}
