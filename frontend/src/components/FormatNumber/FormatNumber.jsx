import React from 'react';
import numeral from 'numeral';

export default ({ currency, format = '0,0', percentage, value }) => {
  let numFormat;
  if (currency) {
    numFormat = '$0,0.00';
  } else if (percentage) {
    numFormat = '0.00%';
  } else {
    numFormat = format;
  }

  const formattedNumber = numeral(value).format(numFormat);

  return <>{formattedNumber}</>;
};
