import pagesApi from 'docs/data/material/pagesApi';
import { MuiPage } from 'docs/src/MuiPage';

const pages: MuiPage[] = [
  {
    pathname: '/bunbun/react-',
    title: 'Components',
    children: [
      {
        pathname: '/bunbun/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/bunbun/react-autocomplete' },
          { pathname: '/bunbun/react-button' },
          { pathname: '/bunbun/react-button-group', title: 'Button Group' },
          { pathname: '/bunbun/react-checkbox' },
          {
            pathname: '/bunbun/react-floating-action-button',
            title: 'Floating Action Button',
          },
          { pathname: '/bunbun/react-radio-button', title: 'Radio Group' },
          { pathname: '/bunbun/react-rating' },
          { pathname: '/bunbun/react-select' },
          { pathname: '/bunbun/react-slider' },
          { pathname: '/bunbun/react-switch' },
          { pathname: '/bunbun/react-text-field', title: 'Text Field' },
          { pathname: '/bunbun/react-transfer-list', title: 'Transfer List' },
          { pathname: '/bunbun/react-toggle-button', title: 'Toggle Button' },
        ],
      },
      {
        pathname: '/bunbun/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/bunbun/react-avatar' },
          { pathname: '/bunbun/react-badge' },
          { pathname: '/bunbun/react-chip' },
          { pathname: '/bunbun/react-divider' },
          { pathname: '/bunbun/icons' },
          { pathname: '/bunbun/material-icons', title: 'Material Icons' },
          { pathname: '/bunbun/react-list' },
          { pathname: '/bunbun/react-table' },
          { pathname: '/bunbun/react-tooltip' },
          { pathname: '/bunbun/react-typography' },
        ],
      },
      {
        pathname: '/bunbun/components/feedback',
        subheader: 'feedback',
        children: [
          { pathname: '/bunbun/react-alert' },
          { pathname: '/bunbun/react-backdrop' },
          { pathname: '/bunbun/react-dialog' },
          { pathname: '/bunbun/react-progress' },
          { pathname: '/bunbun/react-skeleton' },
          { pathname: '/bunbun/react-snackbar' },
        ],
      },
      {
        pathname: '/bunbun/components/surfaces',
        subheader: 'surfaces',
        children: [
          { pathname: '/bunbun/react-accordion' },
          { pathname: '/bunbun/react-app-bar', title: 'App Bar' },
          { pathname: '/bunbun/react-card' },
          { pathname: '/bunbun/react-paper' },
        ],
      },
      {
        pathname: '/bunbun/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/bunbun/react-bottom-navigation', title: 'Bottom Navigation' },
          { pathname: '/bunbun/react-breadcrumbs' },
          { pathname: '/bunbun/react-drawer' },
          { pathname: '/bunbun/react-link' },
          { pathname: '/bunbun/react-menu' },
          { pathname: '/bunbun/react-pagination' },
          { pathname: '/bunbun/react-speed-dial', title: 'Speed Dial' },
          { pathname: '/bunbun/react-stepper' },
          { pathname: '/bunbun/react-tabs' },
        ],
      },
      {
        pathname: '/bunbun/components/layout',
        subheader: 'layout',
        children: [
          { pathname: '/bunbun/react-box' },
          { pathname: '/bunbun/react-container' },
          { pathname: '/bunbun/react-grid' },
          { pathname: '/bunbun/react-grid2', title: 'Grid v2', newFeature: true },
          { pathname: '/bunbun/react-stack' },
          { pathname: '/bunbun/react-image-list', title: 'Image List' },
          { pathname: '/bunbun/react-hidden' },
        ],
      },
      {
        pathname: '/bunbun/components/utils',
        subheader: 'utils',
        children: [
          { pathname: '/bunbun/react-click-away-listener', title: 'Click-Away Listener' },
          { pathname: '/bunbun/react-css-baseline', title: 'CSS Baseline' },
          { pathname: '/bunbun/react-modal' },
          { pathname: '/bunbun/react-no-ssr', title: 'No SSR' },
          { pathname: '/bunbun/react-popover' },
          { pathname: '/bunbun/react-popper' },
          { pathname: '/bunbun/react-portal' },
          { pathname: '/bunbun/react-textarea-autosize', title: 'Textarea Autosize' },
          { pathname: '/bunbun/transitions' },
          { pathname: '/bunbun/react-use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/mui-x', // the pathname does not matter here because the links to MUI X are outbound.
        subheader: 'MUI X',
        children: [
          { pathname: '/x/react-data-grid', title: 'Data Grid' },
          { pathname: '/x/react-date-pickers/getting-started', title: 'Date & Time Pickers' },
        ],
      },
      {
        pathname: '/bunbun',
        subheader: 'lab',
        children: [
          { pathname: '/bunbun/about-the-lab', title: 'About the lab 🧪' },
          { pathname: '/bunbun/react-masonry' },
          { pathname: '/bunbun/react-timeline' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/bunbun/api',
    children: pagesApi,
  },
  {
    pathname: '/bunbun/customization',
    children: [
      {
        pathname: '/bunbun/customization/theme',
        subheader: '/bunbun/customization/theme',
        children: [
          { pathname: '/bunbun/customization/theming' },
          { pathname: '/bunbun/customization/palette' },
          { pathname: '/bunbun/customization/dark-mode' },
          { pathname: '/bunbun/customization/typography' },
          { pathname: '/bunbun/customization/spacing' },
          { pathname: '/bunbun/customization/breakpoints' },
          { pathname: '/bunbun/customization/density' },
          { pathname: '/bunbun/customization/z-index', title: 'z-index' },
          { pathname: '/bunbun/customization/transitions' },
          { pathname: '/bunbun/customization/theme-components', title: 'Components' },
          { pathname: '/bunbun/customization/default-theme', title: 'Default theme viewer' },
        ],
      },
      { pathname: '/bunbun/customization/how-to-customize' },
      { pathname: '/bunbun/customization/color' },
    ],
  },
];

export default pages;
