import UsersTable from './components/users-table';

const UsersPage = () => {
  const users = [
    {
      name: 'Gaye Cone',
      email: 'gcone0@networksolutions.com',
      phone: '703-507-9146',
      address: '1638 Coolidge Parkway',
    },
    {
      name: 'Reiko Bourdon',
      email: 'rbourdon1@youku.com',
      phone: '610-640-2539',
      address: '3340 Haas Road',
    },
    {
      name: 'Wilfrid Scarf',
      email: 'wscarf2@dell.com',
      phone: '993-306-9491',
      address: '39884 Coolidge Point',
    },
    {
      name: 'Boigie Stanlack',
      email: 'bstanlack3@trellian.com',
      phone: '245-615-2562',
      address: '860 Fordem Point',
    },
    {
      name: 'Flori Mott',
      email: 'fmott4@tamu.edu',
      phone: '250-991-9396',
      address: '52 Lake View Street',
    },
    {
      name: 'Abey Pestricke',
      email: 'apestricke5@goo.ne.jp',
      phone: '529-494-5511',
      address: '6 Parkside Pass',
    },
    {
      name: "Romonda O'Fearguise",
      email: 'rofearguise6@zdnet.com',
      phone: '245-239-8625',
      address: '1 Springview Lane',
    },
    {
      name: 'Reena Johanssen',
      email: 'rjohanssen7@comcast.net',
      phone: '619-900-2384',
      address: '9 Dakota Circle',
    },
    {
      name: 'Leonerd Yetton',
      email: 'lyetton8@123-reg.co.uk',
      phone: '261-971-7056',
      address: '83 Myrtle Park',
    },
    {
      name: 'Vaclav Lunney',
      email: 'vlunney9@miitbeian.gov.cn',
      phone: '445-637-2533',
      address: '4749 Amoth Crossing',
    },
  ];

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
      <UsersTable users={users} />
    </>
  );
};

export default UsersPage;
