import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TopUsers from "./component/TopUsers";
import TrendingPosts from "./component/TrendingPosts";
import Feed from "./component/Feed";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex justify-center space-x-8 py-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Feed
            </NavLink>
            <NavLink
              to="/top-users"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Top Users
            </NavLink>
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Trending Posts
            </NavLink>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
