import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  playlist: PlaylistData;
  handleDeletePlaylist: (playlistId: string) => void;
  handleEditPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({
  handleDeletePlaylist,
  handleEditPlaylist,
  playlist,
}: Props) => {
  return (
    <>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => handleDeletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => handleEditPlaylist(playlist)}>update</button>
    </>
  );
};
