const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('generate correct message', () => {
    //store
    var from = 'from@email.com';
    var text = 'Some text';
    var message = generateMessage(from, text);

    //asserts
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});

  });
});
