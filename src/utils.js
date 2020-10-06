import backupAvatar from "./resources/img/qm.png";

const compose = (...funcs) => comp => {
  return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
};

const getImageSize = url => {
  let errorFetching = false;

  return new Promise((resolve, reject) => {
    const i = new Image();

    i.onerror = function () {
      errorFetching = true;
      i.src = backupAvatar;
    };

    i.onload = function () {
      if (i.height && i.width) {
        return resolve({
          errorFetching,
          width: i.width,
          height: i.height
        });
      }
    };

    i.src = url;
  });
};

export { compose, getImageSize };
