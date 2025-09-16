import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm';
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components';

import s from './PlaylistsPage.module.css';

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [searchPlaylist, setSearchPlaylist] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const debouncedSearch = useDebounceValue(searchPlaylist, 2000);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debouncedSearch,
    pageNumber: currentPage,
  });

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

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton count={3} height="100px" width="100%" />
        </p>
      </SkeletonTheme>
    );
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder="search playlist by title"
        value={searchPlaylist}
        onChange={(e) => setSearchPlaylist(e.currentTarget.value)}
      />
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
                  handleEditPlaylist={handleEditPlaylist}
                />
              )}
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount}
      />
    </div>
  );
};
