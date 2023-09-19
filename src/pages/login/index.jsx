export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="border-top w-full rounded-md border-t-4 border-gray-600 bg-white p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-gray-700">
          DaisyUI
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
