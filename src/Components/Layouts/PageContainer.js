import Box from '@mui/material/Box';

import React from 'react';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100vh',
//     padding: `${theme.spacing(12)}px ${theme.spacing(2)}px ${theme.spacing(
//       2
//     )}px`,
//     [theme.breakpoints.up('sm')]: {
//       padding: `${theme.spacing(12)}px ${theme.spacing(3)}px ${theme.spacing(
//         3
//       )}px`,
//     },
//     boxSizing: 'border-box',
//     backgroundColor: '#f5f5f5',
//   },
// }));

const PageContainer = ({ children }) => {
  // const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" style={{
      minHeight: '100vh',
      padding: `3rem 0.5rem 0.5rem`,
      boxSizing: 'border-box',
      backgroundColor: '#f5f5f5',
    }}>
      {children}
    </Box>
  );
};

export default PageContainer;
