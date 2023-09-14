const CurrentUser = ({ avatar, email, name }) => {
  return (
    <div className="flex items-center justify-evenly py-12">
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src={avatar} alt="admin" />
        </div>
      </div>

      <div>
        <p>{email}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CurrentUser;
