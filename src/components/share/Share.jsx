import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import makeRequest from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const QueryClient = useQueryClient();

  const upload = async () => {
    try {
      const fromData = new FormData();
      fromData.append("file", file);
      const res = await makeRequest.post("/upload", fromData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async () => {
    if (!description) {
      setDescriptionError("Description is required !");
      return;
    }

    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ description: description, image: imgUrl });
    setDescription("");
    setFile(null);
    
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"./upload/" + currentUser.profile_pic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError("");
              }}
              value={description}
              required
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <p style={{ color: "red" }} className="error-message">
          {descriptionError}
        </p>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
