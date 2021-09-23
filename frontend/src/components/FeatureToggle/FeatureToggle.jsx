import { IS_DEV, FEATURE_FLAGS } from 'const';

export default props => {
  const isFeatureOn = props.flag;
  // Set simulate to true in constants file to simulate Production behavior.
  const showInDev = IS_DEV && !FEATURE_FLAGS.SIMULATE;

  return showInDev || isFeatureOn ? props.children : null;
};
