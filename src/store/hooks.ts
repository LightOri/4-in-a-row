import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, GameDispatch } from './store';

export const useDispatchHook = () => useDispatch<GameDispatch>();
export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
