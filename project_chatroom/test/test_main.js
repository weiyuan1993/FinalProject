var assert = require('assert');
var main = require('../main.js');

describe('UChat', function(){
  describe('recieveMessage', function(){
    it('recieveMessage', function(){
      assert.equal('true', main.recieveMessage('gigi', 'popo', 'hihi', '08:08', 'data:'));
    })
  })
  describe('bigheadUpload', function(){
	it('bigheadUpload', function(){
	  assert.equal('true', main.bigheadUpload('input'));
	})
  })
  describe('readUpload', function(){
	it('readUpload', function(){
	  assert.equal('true', main.readUpload('input'));
	})
  })
})

