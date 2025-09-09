import type { ChangeEvent } from 'react';

import {
  useDeletePlaylystCoverMutation,
  useUploadPlaylystCoverMutation,
} from '@/features/playlists/api/playlistsApi';
import type { Images } from '@/common/types';

import s from './PlaylistCover.module.css';

import defaultCover from '@/assets/img/default-playlist-cover.png';

type Props = {
  images: Images;
  playlistId: string;
};

export const PlaylistCover = ({ images, playlistId }: Props) => {
  const [uploadPlaylystCover] = useUploadPlaylystCoverMutation();
  const [deletePlaylystCover] = useDeletePlaylystCoverMutation();

  const originalCover = images.main.find((image) => image.type === 'original');
  const src = originalCover?.url || defaultCover;

  const handleUploadCover = (event: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1024 * 1024; // 1 MB

    const file = event.target.files?.length && event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG');
      return;
    }
    if (file.size > maxSize) {
      alert(`Max size is ${Math.round(maxSize / 1024)} KB`);
      return;
    }

    uploadPlaylystCover({ playlistId: playlistId, file: file });
  };

  const handleDeleteCover = () => {
    deletePlaylystCover({ playlistId: playlistId });
  };

  return (
    <>
      <img src={src} alt="cover" className={s.cover} />
      <input
        type="file"
        accept={'image/jpeg, image/png'}
        onChange={handleUploadCover}
      />
      {originalCover && (
        <button onClick={handleDeleteCover}>delete chose image</button>
      )}
    </>
  );
};
