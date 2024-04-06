import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import infoIcon from '../../assets/infoIcon.svg';
import { useMinerLevel } from '../../store/miners';

const UpdateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { minerLevel, setMinerLevel } = useMinerLevel((state) => state);

  const handleUpdateNFT = () => {
    if (minerLevel === 'second') {
      setMinerLevel('third');
    }

    onClose();
  };

  return (
    <>
      <Button
        variant="main"
        w="155px"
        h="36px"
        bg="#699e89"
        color="#fff"
        justifySelf="flex-end"
        onClick={onOpen}
      >
        <Text variant="semiText">Upgrade to Trader</Text>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          maxW="600px"
          bgGradient="linear(to-tr, #213c32 0%,  #305649 100%)"
          p="25px"
        >
          <ModalCloseButton />

          <ModalBody p="0">
            <Flex flexDirection="column" rowGap="20px">
              <Image w="48px" h="48px" src={infoIcon} alt="info" />

              <Text variant="semiText" lineHeight="156%" fontSize="18px">
                You’re choosing to upgrade your citizen. Please accept to
                proceed to the next tier. Note, your previous citizen will be
                burned.
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              fontSize="14px"
              lineHeight="114%"
              color="#96bfae"
              w="70px"
            >
              Close
            </Button>

            <Button
              ml="10px"
              variant="main"
              w="134px"
              fontSize="12px"
              onClick={handleUpdateNFT}
            >
              Accept & Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
