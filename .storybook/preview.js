import "./dev-fonts.scss";
import "../src/components/components.scss";
import "@danskernesdigitalebibliotek/dpl-design-system/build/css/base.css";
import {
  setToken,
  TOKEN_LIBRARY_KEY,
  TOKEN_USER_KEY
} from "../src/core/token";
import "../src/core/mount";
import Store from "../src/components/store";
import { store } from "../src/core/store";

import React from "react";
import { updateStatus } from "../src/core/user.slice";
import { withErrorBoundary } from "react-error-boundary";
import ErrorBoundaryAlert from "../src/components/error-boundary-alert/ErrorBoundaryAlert";

if (process.env.NODE_ENV === "test") {
  store.dispatch(
    updateStatus({
      hasToken: true
    })
  );
}

const getSessionStorage = (type) => window.sessionStorage.getItem(type);
const userToken =
  process.env.STORYBOOK_USER_TOKEN ?? getSessionStorage(TOKEN_USER_KEY);
const libraryToken =
  process.env.STORYBOOK_LIBRARY_TOKEN ?? getSessionStorage(TOKEN_LIBRARY_KEY);

if (userToken) {
  setToken(TOKEN_USER_KEY, userToken);
}

// If the library token has been set manually in the input field in library token story
// it has been added to session storage and we make sure to set it via setToken()
// so it is accessible by components that depend on it.
if (libraryToken) {
  setToken(TOKEN_LIBRARY_KEY, libraryToken);
}

// If we have not set the library token manually we use the user token
// because it at least provide the same access as a library token.
if (!libraryToken && userToken) {
  setToken(TOKEN_LIBRARY_KEY, userToken);
}

const WrappedStory = (app) =>
  withErrorBoundary(app, {
    FallbackComponent: ErrorBoundaryAlert,
    onError(error, info) {
      // Logging should be acceptable in an error handler.
      // eslint-disable-next-line no-console
      console.error(error, info);
    }
  });

const App = ({ story }) => <Store>{WrappedStory(story)}</Store>;

// Consideration for the future - using addon-redux could bring value.
// It wasn't implemented to begin with because it wasn't compatible with Storybook 6.
export const decorators = [
  Story => <><App story={Story} /></>
];
