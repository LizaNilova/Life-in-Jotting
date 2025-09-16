import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks.ts";
import { userProfile } from "../store/reducers/userSlice.ts"

export default function useAuth() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
}