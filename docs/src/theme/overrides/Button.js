import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

export default function Button(theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState) => {
    const inheritColor = ownerState.color === 'inherit';

    const containedVariant = ownerState.variant === 'contained';

    const outlinedVariant = ownerState.variant === 'outlined';

    const textVariant = ownerState.variant === 'text';

    const softVariant = ownerState.variant === 'soft';

    const smallSize = ownerState.size === 'small';

    const largeSize = ownerState.size === 'large';

    const defaultStyle = {
      ...(inheritColor && {
        // CONTAINED
        ...(containedVariant && {
          color: theme.palette.grey[800],
          '&:hover': {
            boxShadow: theme.customShadows.z8,
            backgroundColor: theme.palette.grey[400],
          },
        }),
        // OUTLINED
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          '&:hover': {
            borderColor: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
          },
        }),
        // TEXT
        ...(textVariant && {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.24),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        // CONTAINED
        ...(containedVariant && {
          '&:hover::before, &:hover::after': {
            borderColor: 'white', // White border color on hover
          },
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette[color][isLight ? 'dark' : 'light'],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      '&.Mui-disabled': {
        // SOFT
        ...(softVariant && {
          backgroundColor: theme.palette.action.disabledBackground,
        }),
      },
    };

    const size = {
      borderRadius: 30,
      height: 48,
      padding: '0 24px',
      fontSize: '16px',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: 'calc(100% - 4px)', // Adjust the width as needed
        height: 'calc(100% - 4px)', // Adjust the height as needed
        top: '2px',
        left: '2px',
        border: '2px solid transparent', // Initial transparent border
        borderRadius: 'inherit',
        transition: 'border-color 0.3s ease', // Add a transition for smooth effect
      },
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        ...(softVariant && {
          padding: '4px 10px',
        }),
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        ...(softVariant && {
          padding: '8px 22px',
        }),
      }),
    };

    return [...colorStyle, defaultStyle, disabledState, size];
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: ({ ownerState }) => rootStyle(ownerState),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  };
}
