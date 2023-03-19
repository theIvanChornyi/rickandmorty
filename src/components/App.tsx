import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthHeader from './authHeader/AuthHeader';

import Loader from './loader/Loader';

const HomePage = lazy(() => import('../pages/homePage/HomePage'));
const CharPage = lazy(() => import('../pages/charPage/CharPage'));
const Page404 = lazy(() => import('../pages/page404/Page404'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthHeader />
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="/:id" element={<CharPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
