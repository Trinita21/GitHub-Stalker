import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function App() {
  // logic
  const [username, setUsername] = useState("");
  const [udata, setUdata] = useState("");
  function getUser(e) {
    setUsername(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUdata(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  // return
  return (
    <div className="text-center text-xl">
      <h1 className="text-4xl font-semibold py-4 underline hover:no-underline">
        GitHub Stalker
      </h1>
      <form
        className="flex flex-col mx-auto w-1/4"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          onChange={getUser}
          className="border border-black m-1 p-1 rounded"
          type="text"
          placeholder="Enter a GitHub username"
          required
        />
        <button
          className="border border-green-400 m-1 px-2 py-1 bg-green-200 rounded hover:bg-green-300 cursor-pointer  flex mx-auto"
          type="submit"
        >
          Search
        </button>
      </form>
      <div>
        {udata !== "" ? (
          <div className="flex flex-col w-4/5 mx-auto my-2 p-2">
            <div className="flex justify-center">
              <img
                className="border-4 border-green-300 rounded-full shadow"
                src={udata.avatar_url}
                alt=""
              />
            </div>
            <p className="text-4xl my-4">{udata.name}</p>
            <div className="border-2 rounded p-2 border-green-300  md:w-2/5 md:mx-auto">
              <p>
                {" "}
                <span className="font-semibold">GitHub Profile: </span>
                <a
                  className=" underline hover:text-green-300 hover:no-underline"
                  href={udata.html_url}
                >
                  {udata.html_url}
                </a>
              </p>
              {udata.bio && (
                <p>
                  <span className="font-semibold">Bio: </span> {udata.bio}
                </p>
              )}
              {udata.blog && (
                <p>
                  <span className="font-semibold">Blog: </span>{" "}
                  <a
                    className=" underline hover:text-green-300 hover:no-underline"
                    href={udata.blog}
                  >
                    {udata.blog}
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
