'use strict';

var expect = require('chai').expect,
    utils = require('../lib/utils.js');


describe('utils', function() {

  describe('splitStringToTable', function() {

    it('should split input string to a 2D array', function() {
      var input = [
        '| Header 1 |   Header 2   | Header 3|H|',
        '| --- | --- | :---: | :---: |',
        '| aaa |bbb| ccc | ddd |',
        '   |   eee |fff'
      ].join('\n'),
      output = [
        ['Header 1', 'Header 2', 'Header 3', 'H'],
        ['---', '---', ':---:', ':---:'],
        ['aaa', 'bbb', 'ccc', 'ddd'],
        ['eee', 'fff']
      ],
      maxLengthPerColumn = [8, 8, 8, 5],
      table = utils.splitStringToTable(input);

      expect(table).to.eql(output);

      utils.fillInMissingColumns(table);
      expect(utils.getMaxLengthPerColumn(table)).to.eql(maxLengthPerColumn);

    });

    it('should split input string to a 2D array with <tab> delimiter', function() {
      var input = [
        '\t Header 1 \t   Header 2   \t Header 3\tH\t',
        '\t --- \t --- \t :---: \t :---: \t',
        '\t aaa \tbbb\t ccc \t ddd \t',
        '   \t   eee \tfff'
      ].join('\n'),
      output = [
        ['Header 1', 'Header 2', 'Header 3', 'H'],
        ['---', '---', ':---:', ':---:'],
        ['aaa', 'bbb', 'ccc', 'ddd'],
        ['eee', 'fff']
      ],
      maxLengthPerColumn = [8, 8, 8, 5],
      table = utils.splitStringToTable(input, '\t');

      expect(table).to.eql(output);
      expect(table[1].join('').indexOf('-') >= 0).to.eql(true);

      utils.fillInMissingColumns(table);
      expect(utils.getMaxLengthPerColumn(table)).to.eql(maxLengthPerColumn);
    });

  });

});
