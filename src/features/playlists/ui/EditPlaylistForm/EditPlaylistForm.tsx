import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { useUpdatePlaylistsMutation } from '@/features/playlists/api/playlistsApi';
import type { UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  playlistId: string;
  setPlaylistId: (playlistId: string | null) => void;
  handleEditPlaylist: (playlist: null) => void;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
  register: UseFormRegister<UpdatePlaylistArgs>;
};

export const EditPlaylistForm = ({
  playlistId,
  setPlaylistId,
  handleEditPlaylist,
  handleSubmit,
  register,
}: Props) => {
  const [updatePlaylist] = useUpdatePlaylistsMutation();

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return;
    updatePlaylist({
      playlistId,
      body: data,
    }).then(() => {
      setPlaylistId(null);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => handleEditPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};
