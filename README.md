[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) ![Last commit](https://img.shields.io/github/last-commit/heyitsjhu/nolocimes)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/heyitsjhu/nolocimes/gha-lint-test-and-build/master) [![Coverage Status](https://coveralls.io/repos/github/heyitsjhu/nolocimes/badge.svg?branch=master)](https://coveralls.io/github/heyitsjhu/nolocimes?branch=master)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/heyitsjhu/nolocimes/gha-lint-test-and-build/development) [![Coverage Status](https://coveralls.io/repos/github/heyitsjhu/nolocimes/badge.svg?branch=development)](https://coveralls.io/github/heyitsjhu/nolocimes?branch=development)

# Project Nolocimes

## Getting Started

## Versioning

`auto-changelog`, `commit message` structure and `husky` enforcement

## Code Quality

Various formatting, linting, and pre-commit tools are used to ensure code consistency.

### Formatting and Linting

`.editorconfig`, `eslint` and `jsconfig` in each project folder, `prettier`, `vscode extensions`

### Pre-Commit and Pre-Push Checks

`husky` with `pretty-quick`

## Misc.

`cloc`

### Tools List

[Git LFS](https://git-lfs.github.com/)

#### Code Quality

[Auto-Changelog](https://github.com/cookpete/auto-changelog)
[Commitlint](https://github.com/conventional-changelog/commitlint) - [Homepage](https://commitlint.js.org/)
[EditorConfig](https://editorconfig.org/)
[ESLint](https://github.com/eslint/eslint) - [Homepage](https://eslint.org/)
[Husky](https://github.com/typicode/husky)
[Jest](https://jestjs.io/)
[Prettier](https://github.com/prettier/prettier) - [Homepage](https://prettier.io/)

#### Logging

[rollbar](https://rollbar.com)
[js-logger](https://github.com/jonnyreeves/js-logger)
[redux-logger](https://github.com/LogRocket/redux-logger)

#### Frontend

[animejs](https://animejs.com/)
[crypto-js](https://github.com/brix/crypto-js)
[redux](https://redux.js.org/)
[redux-toolkit](https://redux-toolkit.js.org/)
[react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox)
[react-photo-gallery](https://github.com/neptunian/react-photo-gallery)
[typed.js](http://mattboldt.github.io/typed.js)
[why-did-you-render](https://github.com/welldone-software/why-did-you-render)

#### Content Management

[contentful](https://www.contentful.com/)

## Troubleshooting

### Failing Tests

If the test suites begin failing, especially in tests for files you didn't modify, try running `lerna bootstrap` in the repo's root. This can happen if you run `npm install` to add a new package instead of using lerna.

### References

#### Web Development

- [Automating Changelog in Node Project](https://medium.com/@tiagoboeing/automating-changelog-in-your-nodejs-project-c54bdbb56e57)
- [Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
- [How to Validate Commit Message Convention](https://dev.to/omarzi/how-to-validate-commit-message-convention-using-commitlint-and-husky-aaa)
- [Github Actions - Awesome Actions](https://github.com/sdras/awesome-actions)
- [Jest manual mock for themeprovider](https://stackoverflow.com/questions/58627085/jest-manual-mock-for-themeprovider)
- [Mocking different values for the same module using Jest](https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b)
- [Using requestAnimationFrame with React Hooks](https://css-tricks.com/using-requestanimationframe-with-react-hooks/)
- [Using Feature Toggle in a React application (part 1)](https://medium.com/ecovadis-engineering/using-feature-toggle-in-a-react-application-part-1-ee34a0e72cf4)

#### Blockchain

- [Creating a blockchain with Javascript](https://www.youtube.com/watch?v=zVqczFZr124)
- [How does blockchain work in 7 steps...](https://blog.goodaudience.com/blockchain-for-beginners-what-is-blockchain-519db8c6677a)
- [Storing data on a blockchain](https://malcoded.com/posts/storing-data-blockchain/)
