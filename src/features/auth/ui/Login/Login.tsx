import { Path } from '@/common/routing';
import { useLoginMutation } from '@/features/auth/api/authApi';

export const Login = () => {
  const [login] = useLoginMutation();

  const handleLogin = () => {
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRES + Path.OAuthRedirect;

    const url = `${
      import.meta.env.VITE_BASE_URL
    }/auth/oauth-redirect?callbackUrl=${redirectUri}`;

    window.open(url, 'oauthPopup', 'width=400, heigth=500');

    const hanleRecieveMessage = (event: MessageEvent) => {
      if (event.origin != import.meta.env.VITE_DOMAIN_ADDRES) return;

      const { code } = event.data;
      if (!code) return;

      window.removeEventListener('message', hanleRecieveMessage);
      login({
        code: code,
        redirectUri: redirectUri,
        remeberMe: false,
      });
    };

    window.addEventListener('message', hanleRecieveMessage);
  };

  return (
    <>
      <button type="button" onClick={handleLogin}>
        login
      </button>
    </>
  );
};
