import { useContext } from 'react';
import AppContext from '../../../context';

const useGlobalContent = () => {
  const context = useContext(AppContext);
  const { globalContent } = context;
  return globalContent;
};

export default useGlobalContent;
