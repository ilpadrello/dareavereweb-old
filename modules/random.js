module.exports = function (min, max, decimals = 0) {
  return parseFloat(Math.random() * (max - min) + min).toFixed(decimals);
};
