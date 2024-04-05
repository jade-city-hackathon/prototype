import { create } from 'zustand';

type State = {
  isConnected: boolean;
};

type Actions = {
  setIsConnected: (bool: boolean) => void;
};

export const useWalletConnect = create<State & Actions>((set) => ({
  isConnected: false,
  setIsConnected: (bool: boolean) => set(() => ({ isConnected: bool })),
}));
