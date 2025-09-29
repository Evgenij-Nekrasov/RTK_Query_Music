import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';

import s from './PlaylistsList.module.css';

interface Props {
  playlists?: PlaylistData[];
}

export const PlaylistsList = ({ playlists }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const handleEditPlaylist = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.items}>
      {playlists?.map((playlist) => {
        const isEditing = playlist.id === playlistId;
        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                handleEditPlaylist={handleEditPlaylist}
                handleSubmit={handleSubmit}
                register={register}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                handleEditPlaylist={handleEditPlaylist}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
