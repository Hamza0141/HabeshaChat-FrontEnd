import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import makeRequest from "../../axios";

const Stories = () => {

  const {currentUser} = useContext(AuthContext)
const { isLoading, error, data } = useQuery(["stories",currentUser.id ],() =>
  makeRequest.get(`/posts/stories/${currentUser.id}`).then((res) => {
    return res.data;
  })
);
console.log(data);

  return (
    <div className="stories">
      <div className="story">
        <img src={"./upload/" + currentUser.profile_pic} alt="" />
        <span>{currentUser.name}</span>
        <Link to={`/profile/${currentUser.id}`}>
          <button>+</button>
        </Link>
      </div>
      {data?.map((story) => (
        <div className="story" key={story.id}>
          <Link to={`/profile/${story.user_id}`}>
            <img src={"./upload/" + story.image} alt="" />
          </Link>
          <span>{story.description}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories