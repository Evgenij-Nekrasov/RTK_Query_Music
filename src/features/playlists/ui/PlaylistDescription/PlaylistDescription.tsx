type Props = {
  title: string;
  description: string;
  userName: string;
};

export const PlaylistDescription = ({
  description,
  userName,
  title,
}: Props) => {
  return (
    <>
      <div>title: {title}</div>
      <div>description: {description}</div>
      <div>userName: {userName}</div>
    </>
  );
};
