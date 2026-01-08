import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ user }) => {
  return (
    <div className="p-6 text-center">
      {/* If user NOT logged in */}
      {!user ? (
        <>
          <h2 className="text-xl mt-10 mb-4">
            Please login first
          </h2>

          <Link
            to="/login"
            className="text-blue-600 underline font-medium"
          >
            Go to Login Page
          </Link>

          <Link
            to="/register"
            className="text-blue-600 underline font-medium"
          >
            Go to Register Page
          </Link>
        </>
      ) : (
        /* If user logged in */
        <>
          <h1 className="text-2xl font-bold">Home Page</h1>

          <div className="mt-4 bg-white p-4 rounded shadow inline-block text-left">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
