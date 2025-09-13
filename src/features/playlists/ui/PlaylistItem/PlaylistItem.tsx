import { useDeletePlaylistsMutation } from '@/features/playlists/api/playlistsApi';
import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types';
import { PlaylistCover } from '@/features/playlists/ui/PlaylistCover/PlaylistCover';
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistDescription/PlaylistDescription';

type Props = {
  playlist: PlaylistData;
  handleEditPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ handleEditPlaylist, playlist }: Props) => {
  const [deletePlaylist] = useDeletePlaylistsMutation();

  const handleDeletePlaylist = (playlistId: string) => {
    if (confirm('Are you sure to delete playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  return (
    <div>
      <PlaylistCover
        images={playlist.attributes.images}
        playlistId={playlist.id}
      />
      <PlaylistDescription
        title={playlist.attributes.title}
        description={playlist.attributes.description}
        userName={playlist.attributes.user.name}
      />
      <button onClick={() => handleDeletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => handleEditPlaylist(playlist)}>update</button>
    </div>
  );
};
