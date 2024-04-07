import {
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useEffect } from 'react';
import { useWalletConnect } from '../../store/walletConnection';

const WalletsModal = () => {
  const { setIsConnected } = useWalletConnect((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { select, wallets, publicKey } = useWallet();

  const handleSelectWallet = (wallet: Wallet) => {
    if (wallet.readyState === WalletReadyState.NotDetected) {
      window.open(wallet.adapter.url, '_blank');
    }
    select(wallet.adapter.name);
    onClose();
  };

  useEffect(() => {
    if (publicKey) {
      setIsConnected(true);
    }
  }, [publicKey]);

  return (
    <>
      <Button variant="main" onClick={onOpen} w="172">
        Connect Wallet
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          maxW="600px"
          bgGradient="linear(to-tr, #213c32 0%,  #305649 100%)"
          p="25px"
        >
          <ModalCloseButton />

          <ModalBody>
            <Heading
              size={{ base: 'large28400', lg: 'medium' }}
              textAlign={'center'}
              maxW={{ base: '80%', lg: '300px' }}
              mx={'auto'}
            >
              Connect your wallet
            </Heading>

            <VStack
              gap={{ base: '7px', lg: '4' }}
              mt={{ base: '32px', lg: '8' }}
            >
              {wallets?.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  w="300px"
                  size={'large'}
                  variant="main"
                  onClick={() => handleSelectWallet(wallet)}
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt="phantom icon"
                    width={'41px'}
                    borderRadius={'100%'}
                    mr={3}
                  />
                  {wallet.adapter.name}
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WalletsModal;
