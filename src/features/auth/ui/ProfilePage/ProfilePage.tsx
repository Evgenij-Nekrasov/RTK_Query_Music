import { useGetMeQuery } from '@/features/auth/api/authApi';

export const ProfilePage = () => {
  const { data } = useGetMeQuery();
  return (
    <>
      <h1>MainPage</h1>
      <div>login: {data?.login}</div>
    </>
  );
};
