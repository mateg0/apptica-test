import { AppDispatch, RootState } from "@/entities";
import {
  useSelector as useDefaultSelector,
  useDispatch as useDefaultDispatch,
} from "react-redux";

export const useAppSelector = useDefaultSelector.withTypes<RootState>();

export const useAppDispatch = useDefaultDispatch.withTypes<AppDispatch>();
