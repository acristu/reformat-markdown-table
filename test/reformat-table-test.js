'use strict';

var expect = require('chai').expect,
    reformat = require('../lib/reformat-table.js');


describe('reformat-table', function() {

  it('should reformat a markdown table', function() {
    var input = [
      '| Header 1 |   Header 2   | Header 3|H|',
      '| --- | --- | :---: | :---: |',
      '| aaa |bbb| cccc | ddd |',
      '   |   eee |fff'
    ].join('\n'),
    output = [
      '| Header 1 | Header 2 | Header 3 |   H   |',
      '|----------|----------|:--------:|:-----:|',
      '| aaa      | bbb      |   cccc   |  ddd  |',
      '| eee      | fff      |          |       |',
      ''
    ].join('\n');

    expect(reformat(input)).to.eql(output);
  });

  it('should reformat a markdown table using <tab> delimiter', function() {
    var input = [
      '\t Header 1 \t   Header 2   \t Header 3\tH\t',
      '\t --- \t --- \t :---: \t :---: \t',
      '\t aaa \tbbb\t cccc \t ddd \t',
      '   \t   eee \tfff'
    ].join('\n'),
    output = [
      '\t Header 1 \t Header 2 \t Header 3 \t   H   \t',
      '\t----------\t----------\t:--------:\t:-----:\t',
      '\t aaa      \t bbb      \t   cccc   \t  ddd  \t',
      '\t eee      \t fff      \t          \t       \t',
      ''
    ].join('\n');

    expect(reformat(input, '\t')).to.eql(output);
  });

  it('should reformat table with <tab> delimiter and no header', function() {
    var input = [
      '\taaaa\tbbbb\tcccc\tdddd',
      '\t \t1\t2\t3'
    ].join('\n'),
    output = [
      '\t aaaa \t bbbb \t cccc \t dddd \t',
      '\t      \t 1    \t 2    \t 3    \t',
      ''
    ].join('\n');

    expect(reformat(input, '\t')).to.eql(output);
  });
});
