import { FEATURE_FLAGS, IS_DEV } from 'const';

export const isFeatureOn = featureFlag => {
  // Set SIMULATE to true in constants file to simulate Production behavior.
  const showInDev = IS_DEV && !FEATURE_FLAGS.SIMULATE;
  return showInDev || featureFlag;
};
