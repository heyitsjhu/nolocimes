// https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction
import * as contentful from 'contentful';

import constants from '../const';
import Logger from '../utils/logger';

export class ContentfulAPI {
  constructor({ space, environment, accessToken, host }) {
    // required params = throw eerroro
    this.space = space;
    this.environment = environment || 'master';
    this.accessToken = accessToken;
    this.host = host || constants.CONTENTFUL_HOST;

    this.client = this.init();
  }

  init = () => {
    return contentful.createClient({
      space: this.space,
      environment: this.environment,
      accessToken: this.accessToken,
      host: this.host,
    });
  };

  fetchHandler = async caller => {
    let response = await caller
      .then(resp => {
        Logger.log(resp);

        return resp;
      })
      .catch(error =>
        // return an object container error key
        // that's an object with info about the error
        // maybe from where (api vs backend), message,
        // stacktract (if from backend)
        Logger.error('then erropr', error)
      );

    return response;
  };

  getAsset = async id => {
    const response = await this.fetchHandler(this.client.getContentType(id));

    return response;
  };

  getAssets = async () => {
    const response = await this.fetchHandler(this.client.getAssets());

    return response;
  };

  getContentType = async id => {
    const response = await this.fetchHandler(this.client.getContentType(id));

    return response;
  };

  getEntries = async query => {
    const response = await this.fetchHandler(this.client.getEntries(JSON.parse(query)));

    return response;
  };
}

// export an instance of api class
export default new ContentfulAPI({
  space: constants.CONTENTFUL_SPACE,
  accessToken: constants.CONTENTFUL_ACCESS_TOKEN,
  host: constants.CONTENTFUL_HOST,
});
