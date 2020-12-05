const express = require("express");
const mongoose = require("mongoose");

const Message = require("./models/message");
const File = require("./models/file");

// Create server to serve index.html
const app = express();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;

// Routing
app.use(express.static("public"));

// Socket.io serverSocket
const serverSocket = require("socket.io")(http);

// Start server listening process.
http.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// Connect to mongo
mongoose.connect("<mongodb+srv://test:<test123>@cluster0.rmngq.mongodb.net/<Cluster0>?retryWrites=true&w=majority>", {
  useNewUrlParser: true
});
db = mongoose.connection;

db.on("error", error => {
  console.log(error);
});
db.once("open", () => {
  console.log("MongoDB connected!");
  serverSocket.on("connection", socket => {
    const sendStatus = s => {
      socket.emit("status", s);
    };

    // First time running
    Message.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err;

        socket.emit("init", res);
      });

    File.find()
      .limit(100)
      .sort({ _id: 1 })
      .exec((err, res) => {
        if (err) throw err;

        socket.emit("fileRender", res);
      });

    socket.on("input", data => {
      let name = data.name;
      let body = data.body;

      // Check for name and message
      if (name == "" || body == "") {
        // Send error status
        sendStatus("Please enter a name and question");
      } else {
        // Insert message
        const message = new Message({ name, body });
        message.save(err => {
          if (err) console.error(err);

          serverSocket.emit("output", [data]);

          // Saved!
        });
      }
    });
    socket.on("del", id => {
      console.log(id);
      File.deleteOne({ _id: id }, () => {});
      File.find()
        .limit(100)
        .sort({ _id: 1 })
        .exec((err, res) => {
          if (err) throw err;

          socket.emit("delout", res);
        });
    });

    socket.on("file", data => {
      let filename = data.filename;
      let url = data.url;
      console.log("on emit");
      if (filename == "" || url == "") {
        sendStatus("Please enter the file name and url");
      } else {
        const file = new File({ filename, url });

        file.save(err => {
          if (err) console.error(err);
        });
        console.log(file);
        console.log(filename);
        serverSocket.emit("fileOutput", file);

        // Saved!
        sendStatus("Add File Successfully", file);
      }
    });
    socket.on("getMessage", message => {
      //回傳 message 給發送訊息的 Client
      console.log("suc");
      socket.emit("getMessage", message);
    });

    socket.on("clear", () => {
      // Remove all chats from collection
      Message.deleteMany({}, () => {
        // Emit cleared
        socket.broadcast.emit("cleared");
      });
    });
  });
});
