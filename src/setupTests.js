// AbortController polyfill for cancelable fetch
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";

// Mock for Fetch API
global.fetch = require("jest-fetch-mock");
