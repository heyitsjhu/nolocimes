import { IS_DEV } from 'const';

export default props => {
  const isFeatureOn = props.flag;

  return IS_DEV || isFeatureOn ? props.children : null;
};
