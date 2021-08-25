import currency from 'currency.js';

const THOUSAND = 1000;
const MILLION = THOUSAND * THOUSAND;
const BILLION = MILLION * THOUSAND;
const TRILLION = BILLION * THOUSAND;

export const bigNumFormatter = num => {
  if (Math.abs(num) > TRILLION - 1) {
    return Math.sign(num) * (Math.abs(num) / TRILLION).toFixed(1) + 'T';
  } else if (Math.abs(num) > BILLION - 1) {
    return Math.sign(num) * (Math.abs(num) / BILLION).toFixed(1) + 'B';
  } else if (Math.abs(num) > MILLION - 1) {
    return Math.sign(num) * (Math.abs(num) / MILLION).toFixed(1) + 'M';
  } else if (Math.abs(num) > THOUSAND - 1) {
    return Math.sign(num) * (Math.abs(num) / THOUSAND).toFixed(1) + 'k';
  } else {
    return Math.sign(num) * Math.abs(num);
  }
};

export const displayAsCurrency = (num, language = 'en', options) => {
  const opts =
    language === 'br'
      ? { decimal: ',', pattern: '! #', separator: '.', symbol: 'R$', ...options }
      : { decimal: '.', pattern: '!#', separator: ',', symbol: '$', ...options };

  if (typeof num === 'number') {
    return currency(num, opts).format();
  } else {
    return '-';
  }
};
