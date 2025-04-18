import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./component/TopUsers";
import TrendingPosts from "./component/TrendingPosts";
import Feed from "./component/Feed";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex space-x-4 mb-6">
          <Link to="/" className="text-blue-600">
            Feed
          </Link>
          <Link to="/top-users" className="text-blue-600">
            Top Users
          </Link>
          <Link to="/trending" className="text-blue-600">
            Trending Posts
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending" element={<TrendingPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
