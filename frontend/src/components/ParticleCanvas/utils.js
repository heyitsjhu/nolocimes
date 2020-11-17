export const getRandomSpeed = pos => {
  const [min, max] = [-1, 1];
  switch (pos) {
    case 'top':
      return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
    case 'right':
      return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
    case 'bottom':
      return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
    case 'left':
      return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
    default:
      return;
  }
};
export const randomArrayItem = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};
export const randomNumFrom = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomSidePos = length => {
  return Math.ceil(Math.random() * length);
};

export const getDisOf = (b1, b2) => {
  const delta_x = Math.abs(b1.x - b2.x);
  const delta_y = Math.abs(b1.y - b2.y);

  return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
};
