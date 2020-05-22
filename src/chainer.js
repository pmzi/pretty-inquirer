export default function (items) {
  function Chainer() {
    this.options = {};
  }

  items.forEach((item) => {
    Chainer.prototype[item] = function (value) {
      this.options[item] = value;
      return this;
    };
    Chainer[item] = function (value) {
      const inst = new Chainer();
      return inst[item](value);
    };
  });

  Chainer.prototype.get = function get() {
    return this.options;
  };

  return Chainer;
}
