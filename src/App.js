import { Suspense, lazy } from "react";

import Loading from './components/loading/Loading'
import './App.css';

const Routing = lazy(() => import('./components/routing/Routing'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routing />
    </Suspense>
  );
}

export default App;
