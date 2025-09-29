import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm';
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsList/PlaylistsList';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components';

import s from './PlaylistsPage.module.css';

export const PlaylistsPage = () => {
  const [searchPlaylist, setSearchPlaylist] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounceValue(searchPlaylist, 2000);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debouncedSearch,
    pageNumber: currentPage,
  });

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
      <PlaylistsList playlists={data?.data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount}
      />
    </div>
  );
};
