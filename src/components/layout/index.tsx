import { ReactElement } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import Header from '../header';

interface AuxProps {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: AuxProps) => {
  return (
    <Grid>
      <Header />
      <Box>{children}</Box>
    </Grid>
  );
};

export default Layout;
