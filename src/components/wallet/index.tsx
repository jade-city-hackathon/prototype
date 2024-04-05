import { Flex, Image, Text } from '@chakra-ui/react';
import walletIcon from 'src/assets/walletIcon.svg';

const Wallet = () => {
  return (
    <Flex>
      <Image src={walletIcon} alt="walletIcon" />
      <Text>0X6340fed....63</Text>
    </Flex>
  );
};

export default Wallet;
