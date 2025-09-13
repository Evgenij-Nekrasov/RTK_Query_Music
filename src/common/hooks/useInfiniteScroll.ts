import { useCallback, useEffect, useRef } from 'react';

type Props = {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
};

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.length > 0 && entries[0].isIntersecting) {
        handleLoadMore();
      }
    });

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [handleLoadMore]);

  return { observerRef };
};
