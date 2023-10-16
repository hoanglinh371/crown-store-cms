import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { UserContext } from '@/contexts/user.context';

import crownLogo from '../../../../../../crown.svg';

function Header() {
  const { setIsAuthenticated } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex h-20 items-center justify-between bg-white px-5 shadow-md">
        <div>
          <Link to="/">
            <img src={crownLogo} alt="logo" />
          </Link>
        </div>
        <div>
          <p
            onClick={() => setIsAuthenticated(false)}
            className="cursor-pointer"
          >
            LOGOUT
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
