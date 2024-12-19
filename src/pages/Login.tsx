const Login = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-lg w-80">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-gray-700"
          />
          <button className="w-full bg-blue-600 p-2 rounded">Login</button>
        </div>
      </div>
    );
  };
  
  export default Login;
  