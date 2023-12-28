import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CountryDropdown } from '../components/CountryComponent';
import "../App.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    catchPhrase: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

function UserProfile(): JSX.Element {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClosePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const userData: User = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const postsData: Post[] = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handlePostClick = (postId: number) => {
    const clickedPost = posts.find(post => post.id === postId);
    setSelectedPost(clickedPost || null);
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <CountryDropdown/>
      <h1 className="user-name">PROFILE PAGE</h1>
      <div className="profile-header">
        <div>
          <p><b>Name: </b>{user.name}</p>
          <span><b>Username: </b>{user.username}</span> |<span> <b>CatchPhrase: </b>{user.company.catchPhrase}</span>
        </div>
        <div>
          <p className="address"><b>Address: </b>
            <span>Street- {user?.address?.street}</span>
            <span>City- {user?.address?.city}</span>
            <span>Zipcode- {user?.address?.zipcode}</span>
            </p>
          <p className="email"><b>Email: </b>{user.email}</p>
          <p className="phone"><b>Phone: </b>{user.phone}</p>
        </div>
      </div>
     

      <h2>Posts</h2>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="card" onClick={() => handlePostClick(post.id)}>
            <p><b>Title:</b> {post.title}</p>
            <p><b>Body:</b> {post.body}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
            <span className="close" onClick={handleClosePopup}>×</span>
            <h3><b>Title:</b> {selectedPost.title}</h3>
            <p><b>Body:</b> {selectedPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { UserProfile };
