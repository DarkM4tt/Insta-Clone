import { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "urstruly_prabhat",
      caption: "Wow it works!",
      imageUrl:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--goETGOXU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/x3x5w638kkixi9s3h3vw.gif",
    },
    {
      username: "urstruly_prabhat",
      caption: "Wow it works!",
      imageUrl:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--goETGOXU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/x3x5w638kkixi9s3h3vw.gif",
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <h1>Hello</h1>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
