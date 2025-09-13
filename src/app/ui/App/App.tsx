import { Header, LinearProgress } from '@/common/components';
import { Routing } from '@/common/routing';
import { useGlobalLoading } from '@/common/hooks';

import s from './App.module.css';

export function App() {
  const isGlobalLoading = useGlobalLoading();

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  );
}
