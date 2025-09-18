import { Link, NavLink } from 'react-router';

import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi';
import { Login } from '@/features/auth/ui/Login/Login';
import { Path } from '@/common/routing';

import s from './Header.module.css';

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Playlists, label: 'Playlists' },
  { to: Path.Tracks, label: 'Tracks' },
];

export const Header = () => {
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = () => logout();

  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `link ${isActive ? s.activeLink : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {!data && <Login />}

      {data && (
        <div className={s.loginContainer}>
          <Link to={Path.Profile}>{data.login}</Link>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </header>
  );
};
