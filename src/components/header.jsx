import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="flex h-20 items-center justify-between bg-white px-5 shadow-md">
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
