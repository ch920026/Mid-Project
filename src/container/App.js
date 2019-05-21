import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ReactDom from "react-dom";
import "../index.css";
import ReactDOM from "react-dom";
import webSocket from "socket.io-client";
import File from "../components/File";
import Chat from "../components/Question";
import Menu from "./menu";
import PDF from "../components/PDF";
import ClassList from "./Posts/ClassList";
import Slide from "./Posts/Slide";

import "antd/dist/antd.css";
import { relativeTimeRounding } from "moment";
//=============================Variables=================================
function App() {
  // Getting Elements
  const element = id => {
    return document.getElementById(id);
  };
  const status = element("status");
  const messages = element("messages");
  const textarea = element("textarea");
  const username = element("username");
  const classMenu = element("classMenu");
  let fileArray = [];
  const list = element("list");
  const [socket, setSocket] = useState(null);
  let c = 0;
  let test = [];
  let a = document.createElement("div");
  //==============================Server=================================
  const connectWebSocket = () => {
    //開啟
  };

  useEffect(() => {
    if (c === 0) {
      setSocket(webSocket("http://localhost:3000"));

      c = 1;
    }
  }, [c]);

  useEffect(() => {
    if (socket) {
      initWebSocket();
    }
  }, [socket]);

  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    socket.on("getMessage", message => {
      console.log(message);
    });

    socket.on("fileOutput", data => {
      fileArray.push(data);
    });
    socket.on("fileRender", data => {
      fileArray = data.slice(0);

      if (data.length && classMenu && classMenu.childNodes.length === 0) {
        updateFile(data);
      }
    });

    socket.on("init", data => {
      if (data.length && messages.childNodes.length === 0) updateList(data);
    });

    socket.on("output", data => {
      if (data.length) updateList(data);
    });

    socket.on("cleared", () => {
      clearList();
    });
    socket.on("delout", data => {
      console.log(data);
      fileArray = data.slice(0);
    });

    socket.on("status", data => {
      setStatus(typeof data === "object" ? data.message : data);

      // If status is clear, clear text
      if (data.clear) {
        textarea.value = "";
      }
    });
  };
  //=======================================Ask===========================================
  const sendMessage = () => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    socket.emit("getMessage", "只回傳給發送訊息的 client");
  };

  const updateList = data => {
    for (let x = 0; x < data.length; x++) {
      // Building out message div
      const message = document.createElement("div");
      message.setAttribute("class", "chat-message");
      message.textContent = data[x].name + ": " + data[x].body;
      messages.appendChild(message);

      //            messages.insertBefore(message, messages.firstChild)
    }
  };
  const updateFile = data => {
    fileArray = data.slice(0);
  };
  const Question = e => {
    if (e.key === "Enter" && e.shiftKey == false) {
      // Emit to server input
      socket.emit("input", {
        name: username.value,
        body: textarea.value
      });
      e.preventDefault();
      textarea.value = "";
    }
  };
  //====================================Clear========================================
  const Clear = () => {
    clearList();
    socket.emit("clear");
  };

  // Clear Message

  const clearList = () => {
    messages.textContent = "";
    username.value = "";
    username.focus();
  };
  //======================================File=======================================

  const add = () => {
    // Emit to server input
    const fileName = document.getElementById("filename");
    const fileUrl = document.getElementById("url");
    const status = document.getElementById("status");
    var check = checkUrl(fileUrl.value);
    if (check === "pdf") {
      socket.emit("file", {
        filename: fileName.value,
        url: fileUrl.value
      });
      fileUrl.value = "";
      fileName.value = "";
      status.style.color = "lightgreen";
    } else {
      setStatus("This is not a pdf");
      status.style.color = " rgb(172, 51, 51)";
      console.log("not a pdf");
    }
  };
  const deleteFile = e => {
    console.log(e.target);
    const id = e.target.id;
    socket.emit("del", id);
  };

  const checkUrl = url => {
    var lastChar = url.substring(url.length - 3, url.length);
    return lastChar;
  };
  //=====================================Satus=======================================
  const setStatus = s => {
    // Setting status
    const status = document.getElementById("status");
    status.textContent = s;

    // Resetting status to default every x seconds
    if (s !== "") {
      setTimeout(() => {
        setStatus("");
      }, 500);
    }
  };

  //==================================================================================

  return (
    <BrowserRouter>
      <div className="Wrapper">
        <div className="container">
          <div className="row">
            <Menu />
            <div className="Add">
              <Switch>
                <Route
                  path="/home"
                  render={props => <File {...props} add={add} />}
                />
                <Route
                  path="/classes/"
                  render={props => (
                    <ClassList
                      {...props}
                      fileArray={fileArray}
                      d={deleteFile}
                    />
                  )}
                />{" "}
                />
                <Route
                  path="/class/:id?"
                  render={props => <Slide {...props} fileArray={fileArray} />}
                />
              </Switch>
            </div>
            <Chat ask={Question} Clear={Clear} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
/*
 render={props => (
                    <ClassList {...props} fileArray={fileArray} />
                  )}
                  */
