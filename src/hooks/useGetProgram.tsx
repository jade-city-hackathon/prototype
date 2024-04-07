import { useMemo } from 'react';
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/provider/utils';

const mockWallet = () => {
  return {} as AnchorWallet;
};

export const useGetProgram = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  return useMemo(() => {
    if (connection) {
      return getProgram(connection, wallet ?? mockWallet());
    }
  }, [connection, wallet]);
};
