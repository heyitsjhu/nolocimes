const lowerCaseA = 97;
const lowerCaseZ = 122;

export const generateIdentifier = (charCount = 7) => {
  let charCodes = [];
  for (let i = 0; i < charCount; i++) {
    charCodes.push(Math.floor(Math.random() * (lowerCaseZ - lowerCaseA) + lowerCaseA));
  }
  return String.fromCharCode(...charCodes);
};

const quarterMapping = {
  Q1: ['01', '02', '03'],
  Q2: ['04', '05', '06'],
  Q3: ['07', '08', '09'],
  Q4: ['10', '11', '12'],
};

/**
 * Parse a date string and returns the corresponding quarter
 * and abbreviated year (for example, "Q1 '20")
 * @param {*} dateString
 */
export const convertDateToQuarter = dateString => {
  const [year, month, _] = dateString.split('-');
  const index = Object.values(quarterMapping).findIndex(months => months.includes(month));
  const quarter = Object.keys(quarterMapping)[index];

  return `${quarter} '${year.slice(2)}`;
};

export const getShortenedQuarter = quarterString => {
  const [quarter, year] = quarterString.split(' ');
  return `${quarter} '${year.slice(2)}`;
};
