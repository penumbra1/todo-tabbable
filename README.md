_Works with JSON-server at localhost:8080 for now (see src/lib/todoService.js)_

This is a simple todo app from a very useful [React course](https://egghead.io/courses/build-your-first-production-quality-react-app) by Andy van Slaars. I made a few tweaks:

- Implemented error handling and UI updates for database request failures
- Experimented with [abortable fetch](https://developers.google.com/web/updates/2017/09/abortable-fetch) for canceling async requests before unmounting
- Added AbortController and fetch polyfills for Jest
- Set up a "bad" JSON server that rejects all connections for testing
- Used the new version of React Context API
- Switched to react-scripts@next to load SVG icons inline via Webpack ([tip source](https://github.com/facebook/create-react-app/issues/4199#issuecomment-375530161))
- Made the app fully functional for keyboard-only users
- Cleaned up unnecessary divs, improved HTML semantics and accessibility
- Added styles and icons

TODO: refactor CSS, turn footer into accessible `<nav>` and style it, add pagination on todo list (via json-server pagination).
