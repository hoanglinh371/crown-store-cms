import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="flex h-20 items-center justify-between px-5 shadow-md">
        <div>
          <Link to="/">LOGO</Link>
        </div>
        <div>
          <p>LOGOUT</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
