import { useMinerLevel } from '../../store/miners';
import MintMiner from '../mintMiner';
import UpdateMiner from '../updateMiner';

const Miner = () => {
  const { minerLevel } = useMinerLevel((state) => state);
  return (
    <>
      {minerLevel === 'first' && <MintMiner />}
      {minerLevel === 'second' && <UpdateMiner />}
      {minerLevel === 'third' && <UpdateMiner />}
    </>
  );
};

export default Miner;
