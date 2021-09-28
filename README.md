<div align="center" markdown="1">
  <img src="https://github.com/heyitsjhu/nolocimes/blob/development/frontend/public/logo192.png" />
  
  <h1 align="center">Project Nolocimes</h1>
  
  [heyitsjhu](https://www.linkedin.com/in/jgeehenhu/)'s official development playground.

<a href="http://www.heyitsjhu.com/" target="_blank">View Website</a>

</div>

![Last commit](https://img.shields.io/github/last-commit/heyitsjhu/nolocimes)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/heyitsjhu/nolocimes/gha-lint-test-and-build/master) [![Coverage Status](https://coveralls.io/repos/github/heyitsjhu/nolocimes/badge.svg?branch=master)](https://coveralls.io/github/heyitsjhu/nolocimes?branch=master)

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/heyitsjhu/nolocimes/gha-lint-test-and-build/development) [![Coverage Status](https://coveralls.io/repos/github/heyitsjhu/nolocimes/badge.svg?branch=development)](https://coveralls.io/github/heyitsjhu/nolocimes?branch=development)

The official development playground for Johnny Hu (heyitsjhu).

## Introduction / About Me

Hi there, I'm Johnny. This repository serves as a sandbox for me to practice, improve and showcase my development skills. You can view this as sort of a code-focused resume aimed at providing you with a look into my coding style and philosophy.

Within most of the folders, you will find a README.md file detailing my thoughts and rational behind the code written in the files.

## Getting Started / Project Information

Let's get started.

This project is a typical full-stack JavaScript application with a [React](https://reactjs.org/) frontend and [Node.js](https://nodejs.org/) backend.

### Methodology

### Folder Structure

### Versioning

`auto-changelog`, `commit message` structure and `husky` enforcement

### Deployment

**Production** deployment is handled by [App Engine](https://cloud.google.com/appengine/docs) and is linked to the repo's `master` branch. When changes are made to the branch, it triggers a GitHub Action that includes steps to automatically compile the necessary environment variables—thus, not having to store it in the `app.yaml` file and exposing it on GitHub—and deploy the application to App Engine. The production build can be view [here](https://www.heyitsjhu.com).

**Development** deployment is handled by [Heroku](https://www.heroku.com/) and is linked to the repo's `development` branch. It works very similar to the pipeline for the `master` branch, except after its GitHub Action passes, a notification/trigger is set to Heroku, where it will then retrieve, build and deploy the branch onto its platform—and can be viewed [here](https://nolocimes-dev.herokuapp.com/). This is likely where I'll do some UI testing outside of my local environment to ensure everything is working as expected, so it'll likely be a bit buggy, but you might find some work-in-progress features ahead of its release.

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
