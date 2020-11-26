import React from 'react';
import { Helmet } from 'react-helmet';

export default props => {
  const renderMetaTags = meta => {
    const isArray = meta && Array.isArray(meta) && meta.length > 0;
    return isArray ? meta.map((metaObj, i) => <meta key={`meta-tag-${i}`} {...metaObj} />) : null;
  };

  const renderBaseTag = base => {
    return base ? <base {...base} /> : null;
  };

  const renderTitleTag = title => {
    return title ? <title>{title}</title> : null;
  };

  const renderLinkTags = links => {
    const isArray = links && Array.isArray(links) && links.length > 0;
    return isArray ? links.map((linkObj, i) => <link key={`link-tag-${i}`} {...linkObj} />) : null;
  };

  return props.title ? (
    <Helmet>
      {renderMetaTags(props.meta)}
      {renderBaseTag(props.base)}
      {renderTitleTag(props.title)}
      {renderLinkTags(props.links)}
    </Helmet>
  ) : null;
};
