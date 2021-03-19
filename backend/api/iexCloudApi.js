import constants from '../const';
import IEXCloudAPI from '@dreamistlabs/iex-cloud-api';

export default new IEXCloudAPI({
  mode: 'sandbox',
  token: constants.IEX_TOKEN,
});
