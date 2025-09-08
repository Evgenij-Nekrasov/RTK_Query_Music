import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useDeletePlaylistsMutation,
  useFetchPlaylistsQuery,
} from '@/features/playlists/api/playlistsApi';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm';
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem';

import s from './PlaylistsPage.module.css';

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data } = useFetchPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistsMutation();

  const handleDeletePlaylist = (playlistId: string) => {
    if (confirm('Are you sure to delete playlist?')) {
      deletePlaylist(playlistId);
    }
  };

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
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
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
                  handleDeletePlaylist={handleDeletePlaylist}
                  handleEditPlaylist={handleEditPlaylist}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
