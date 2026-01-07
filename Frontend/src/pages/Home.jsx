const Home = ({ user }) => {
  if (!user) {
    return <h2 className="text-center mt-10">Please login first</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home Page</h1>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Home;
