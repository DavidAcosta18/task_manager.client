import { useContext } from 'react';
import { AbilityContext } from '../context/ability/ability-context';

export function useAbility() {
  return useContext(AbilityContext);
}
