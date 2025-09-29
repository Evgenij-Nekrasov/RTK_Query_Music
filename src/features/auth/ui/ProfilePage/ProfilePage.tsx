import { Path } from '@/common/routing';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm';
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsList/PlaylistsList';
import { Navigate } from 'react-router';

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery();

  const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
    {
      userId: meResponse?.userId,
    },
    { skip: !meResponse?.userId }
  );

  if (isMeLoading || isLoading) return <h1>Skeleton...</h1>;

  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />;

  return (
    <div>
      <h1>{meResponse?.login}</h1>
      <div>
        <CreatePlaylistForm />
        <PlaylistsList playlists={playlistsResponse?.data || []} />
      </div>
    </div>
  );
};
