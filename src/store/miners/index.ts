import { create } from 'zustand';

type Levels = 'first' | 'second' | 'third';

type State = {
  minerLevel: Levels;
  completeTask1: boolean;
  completeTask2: boolean;
  completeTask3: boolean;
  metaData:
    | undefined
    | {
        image: string;
        attributes: { trait_type: string; value: string }[];
      };
};

type Actions = {
  setMinerLevel: (minerLevel: 'first' | 'second' | 'third') => void;
  setCompleteTask1: (bool: boolean) => void;
  setCompleteTask2: (bool: boolean) => void;
  setCompleteTask3: (bool: boolean) => void;
  setMetaData: (
    metadata:
      | undefined
      | {
          image: string;
          attributes: { trait_type: string; value: string }[];
        },
  ) => void;
};

export const useMinerLevel = create<State & Actions>((set) => ({
  minerLevel: 'first',
  metaData: undefined,
  completeTask1: false,
  completeTask2: false,
  completeTask3: false,
  setMetaData: (
    data:
      | undefined
      | {
          image: string;
          attributes: { trait_type: string; value: string }[];
        },
  ) => set(() => ({ metaData: data })),
  setMinerLevel: (minerLevel: Levels) =>
    set(() => ({
      minerLevel: minerLevel,
      completeTask1: false,
      completeTask2: false,
      completeTask3: false,
    })),
  setCompleteTask1: (bool: boolean) => set(() => ({ completeTask1: bool })),
  setCompleteTask2: (bool: boolean) => set(() => ({ completeTask2: bool })),
  setCompleteTask3: (bool: boolean) => set(() => ({ completeTask3: bool })),
}));
