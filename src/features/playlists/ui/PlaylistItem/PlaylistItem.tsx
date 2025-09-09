import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types';
import { PlaylistCover } from '@/features/playlists/ui/PlaylistCover/PlaylistCover';
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistDescription/PlaylistDescription';

type Props = {
  playlist: PlaylistData;
  handleDeletePlaylist: (playlistId: string) => void;
  handleEditPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({
  handleDeletePlaylist,
  handleEditPlaylist,
  playlist,
}: Props) => (
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
