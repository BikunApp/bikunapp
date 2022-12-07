import { Suspense, lazy } from "react";

import Loading from './components/loading/Loading'
import './App.css';

// provider
import BikunContextProvider from "./provider/BikunContextProvider";

const Routing = lazy(() => import('./components/routing/Routing'));


function App() {
  return (
    <BikunContextProvider>
      <Suspense fallback={<Loading />}>
        <Routing />
      </Suspense>
    </BikunContextProvider>
  );
}

export default App;
