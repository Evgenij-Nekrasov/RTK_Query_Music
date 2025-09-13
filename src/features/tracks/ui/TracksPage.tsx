import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useInfiniteScroll } from '@/common/hooks';
import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi';

export const TracksPage = () => {
  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchTracksInfiniteQuery();
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  const pages = data?.pages.flatMap((page) => page.data);

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
    <>
      <h1>TracksPage</h1>
      <div>
        {pages?.map((track) => {
          const { title, user, attachments } = track.attributes;
          return (
            <div key={track.id}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? (
                <audio controls src={attachments[0].url} />
              ) : (
                'no file'
              )}
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <div ref={observerRef}>
          {isFetching ? (
            <div>Loading more tracks...</div>
          ) : (
            <div style={{ height: '20px' }}></div>
          )}
        </div>
      )}

      {!hasNextPage && pages?.length > 0 && <p>Nothing more to load</p>}
    </>
  );
};
