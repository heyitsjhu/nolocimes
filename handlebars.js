const { DateTime } = require('luxon');

module.exports = function (UI) {
  UI.registerHelper('formatDate', (datetime, format = 'short') => {
    if (format === 'long') {
      return DateTime.fromISO(datetime).toLocaleString(DateTime.DATE_HUGE);
    } else {
      const { day, month, year } = DateTime.fromISO(datetime);
      const d = day < 10 ? `0${day}` : day;
      const m = month < 10 ? `0${month}` : month;

      return `${year}-${m}-${d}`;
    }
  });

  // TODO: Add a helper that removes the prefixes in the commit messages (eg, other, feature, etc)
  UI.registerHelper('removePrefix', subject => {
    const replaceRegex = new RegExp(/^(.+:)/m);

    return subject.replace(replaceRegex, '').trim();
  });
};
