import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
