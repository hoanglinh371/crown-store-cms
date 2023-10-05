import { Link } from 'react-router-dom';

export default function Pagination({ pathname, totalPages, currentPage }) {
  return (
    <div className="join">
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index}
          to={`${pathname}?page=${index + 1}`}
          className={`btn join-item btn-sm ${
            currentPage === index + 1 ? 'btn-active' : ''
          }`}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
}
