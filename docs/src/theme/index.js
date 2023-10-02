import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import GlobalStyles from './globalStyles';
import useLazyCSS from "../modules/utils/useLazyCSS";

// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-use-before-define
ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeMode = 'light';
  const themeDirection = 'ltr';
  useLazyCSS('/static/styles/prism-okaidia.css', '#prismjs');
  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
      applyDarkStyles: () => {}
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
