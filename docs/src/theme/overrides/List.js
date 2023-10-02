// ----------------------------------------------------------------------

export default function List(theme) {
  return {
    // MuiListItem: {
    //   styleOverrides: {
    //     root: {
    //       padding: '6px 12px',
    //       minHeight: 50,
    //       border: 'solid transparent',
    //       borderWidth: 2,
    //       background: 'transparent',
    //       borderRadius: 12,
    //       '&:hover': {
    //         backgroundColor: '#FFFFFFA3',
    //         boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.32)'
    //       },
    //       '&.Mui-selected': {
    //         backgroundColor: '#FFFFFFA3',
    //         borderColor: theme.palette.primary.main,
    //         '&:hover': {
    //           backgroundColor: '#FFFFFFA3',
    //           borderColor: theme.palette.primary.main,
    //           boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.32)',
    //         },
    //       },
    //     },
    //   },
    // },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '6px 12px',
          minHeight: 50,
          border: 'solid transparent',
          borderWidth: 2,
          background: 'transparent',
          borderRadius: 12,
          '&:hover': {
            backgroundColor: '#FFFFFFA3',
            boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.32)'
          },
          '&.Mui-selected': {
            backgroundColor: '#FFFFFFA3',
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: '#FFFFFFA3',
              borderColor: theme.palette.primary.main,
              boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.32)',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}
