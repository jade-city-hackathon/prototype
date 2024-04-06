import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import logo from '../../assets/logo.svg';
import { useWalletConnect } from '../../store/walletConnection';
import Wallet from '../wallet';

const Header = () => {
  const { isConnected } = useWalletConnect((state) => state);

  return (
    <Grid
      height="360px"
      bgGradient="linear(to-tr,#0b1310 0%, #1f382e 100%)"
      justifyContent="center"
      position="relative"
    >
      <Flex
        position="absolute"
        top="30px"
        right="90px"
        visibility={isConnected ? 'visible' : 'hidden'}
        transition="all .3s"
      >
        <Wallet />
      </Flex>
      <Flex justifyContent="center" alignItems="center" columnGap="1em">
        <Image w={75} h={75} src={logo} alt="logo" />
        <Text fontFamily="Futura Book" variant="title">
          JadeCity
        </Text>
      </Flex>
    </Grid>
  );
};

export default Header;
