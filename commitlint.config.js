module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-case': [
      2,
      'never',
      ['snake-case', 'kebab-case', 'pascal-case', 'upper-case'],
    ],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'scope-empty': [2, 'always'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', ['lower-case', 'start-case']],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['breaking', 'docs', 'feature', 'fix', 'other']],
  },
};
