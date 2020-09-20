const compose = (...funcs) => comp => {
  return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
};

const getImageSize = url => {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = function () {
      if (i.height && i.width) {
        return resolve({
          width: i.width,
          height: i.height
        });
      }

      return reject(null);
    };

    i.src = url;
  });
};

export { compose, getImageSize };
