import { useForm, type SubmitHandler } from 'react-hook-form';

import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types';
import { useCreatePlaylistsMutation } from '@/features/playlists/api/playlistsApi';

export const CreatePlaylistForm = () => {
  const [createPlaylist] = useCreatePlaylistsMutation();
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>();

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
    createPlaylist(data)
      .unwrap()
      .then(() => reset());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button>create playlist</button>
    </form>
  );
};
