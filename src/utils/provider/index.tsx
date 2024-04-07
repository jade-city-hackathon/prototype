import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ReactNode, useCallback, useMemo } from 'react';
import { getCluster } from './cluster';

const IS_DEV_NET = true;

const Provider = ({ children }: { children: ReactNode }) => {
  const network = IS_DEV_NET
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet;

  const cluster = getCluster(network);

  const endpoint = useMemo(() => cluster.endpoint, [cluster]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Provider;
