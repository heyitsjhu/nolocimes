import constants from '../const';
import IEXCloudAPI from '@dreamistlabs/iex-cloud-api';
// import CheckMe from '@dreamistlabs/iexcloud-api';

// CheckMe();

export default new IEXCloudAPI({
  mode: 'sandbox',
  token: constants.IEX_TOKEN,
});
