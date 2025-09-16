import { ToastContainer } from 'react-toastify';

import { Header, LinearProgress } from '@/common/components';
import { Routing } from '@/common/routing';
import { useGlobalLoading } from '@/common/hooks';

import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const isGlobalLoading = useGlobalLoading();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  );
}
