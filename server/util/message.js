var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://google.com/maps?q=${latitude},${longitude}`
  };
}
module.exports = {generateMessage,generateLocationMessage};
