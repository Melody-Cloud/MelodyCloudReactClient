# Melody Cloud React client

This is web interface for Melody Cloud project.

## Requirements

- This project uses MediaElement library in order to play RTMP stream in browser, so "build" directory needs to be 
downloaded from here: https://github.com/mediaelement/mediaelement and placed as "static/build/" directory in root location of 
the project (this is needed by webpack to bundle files for Flash plugin, they are imported in src/components/MediaElement.jsx file).

Note: Flash plugin must be explicitly enabled in the browser by the user for him to use RTMP. Otherwise he can use standard HTML audio streaming.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage
**Start Development Server**

`npm run start`

* (HMR enabled)
* AppRouting will be served at `http://localhost:8089`

**Build for production**

`npm run build`

* Build files will appear under dist/ directory

---

**All commands**

Command | Description
--- | ---
`npm run start-dev` | Build app continously (HMR enabled) and serve @ `http://localhost:8080`
`npm run start-prod` | Build app once (HMR disabled) and serve @ `http://localhost:3000`
`npm run build` | Build app to `/dist/`
`npm run test` | Run tests
`npm run prettier-write` | Format code and write changes
`npm run prettier-check` | Prints the filenames of files that are different from Prettier formatting
`npm run start` | (alias of `yarn run start-dev`)

**Note**: replace `npm` with `yarn` if you use npm.
