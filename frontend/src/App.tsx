import { useRoutes } from "../src/utils/useRouts.tsx"
import useAuth from "./utils/useAuth.ts"
import { useAppSelector } from "./store/hooks.ts"

function App() {
  const { user } = useAppSelector((state) => state.userSlice)
  useAuth()
  console.log(user?.username)
  const routes = useRoutes(Boolean(user?._id))
  return (<>
    {routes}
  </>
  );
}

export default App
