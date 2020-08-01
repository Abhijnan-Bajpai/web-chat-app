import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";
import "./App.css";
import MetaTags from "react-meta-tags";
import Message from "./Message";
import db from "./firebase.js";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Tus from "./Tushar.jpg";
import Sid from "./vuppu.jpg";
import abj from "./Abhijnan.jpg";
import encrypt from "/home/abhijnan/messages/src/Encryption.js"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      marginLeft: theme.spacing(4.8),
      marginBottom: 0,
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginLeft: theme.spacing(20),
  },
}));

function App() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  //var crypto = require('crypto');

  //var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
  //var mystr = mykey.update({input}, 'utf8', 'hex')
  //mystr += mykey.final('hex');
  //console.log(mystr); //34feb914c099df25794bf9ccb85bea72

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // run code based on a condition
    // const Username = prompt('Please enter your name:');
    setUsername(prompt("Please enter your name:"));
  }, []); //condition
  // console.log(input);
  // console.log(messages);

  const sendMessage = (event) => {
    //all the logic to send the message
    var encryptedMessage = encrypt(input);
    var today = new Date();
    if (today.getMinutes() >= 10) {
      var timing = today.getHours() + ":" + today.getMinutes();
    } else {
      var timing = today.getHours() + ":" + "0" + today.getMinutes();
    }
    event.preventDefault();

    db.collection("messages").add({
      message: encryptedMessage,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      time: timing,
    });
    setInput("");
  };
  return (
    <body>
      <div className="container">
        <MetaTags>
          <title>Chat</title>
          <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
          <link
            type="text/css"
            rel="stylesheet"
            href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
          />
        </MetaTags>
        <img
          className="IFSCR"
          src="https://media-exp1.licdn.com/dms/image/C510BAQFE7nDLyYM2NA/company-logo_200_200/0?e=1603324800&v=beta&t=pUhLBqYJRJAMbeRdyLgBuj92UndXoC1oNq_-iY74-PI"
          alt="PESU IFSCR"
        />
        <div className="heading" style={{ color: "white" }}>
          Welcome {username}!
        </div>
        <div className="overlay">
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                textWeight: "bolder",
                border: "2px",
                borderStyle: "solid",
                borderBlockColor: "black",
                fontSize: "40px",
              }}
            >
              Developers
            </span>
          </div>
          <div className={classes.root}>
            <figure>
              <Avatar
                src={abj}
                alt="Abhijnan Bajpai"
                className={classes.large}
              />
              <figcaption style={{ marginLeft: "180px" }}>
                Abhijnan Bajpai
              </figcaption>
            </figure>
            <figure>
              <Avatar
                src={Sid}
                alt="Siddarth Vuppunahalli"
                className={classes.large}
              />
              <figcaption style={{ marginLeft: "150px" }}>
                Siddarth Vuppunahalli
              </figcaption>
            </figure>
            <figure>
              <Avatar src={Tus} alt="Tushar Shetty" className={classes.large} />
              <figcaption style={{ marginLeft: "180px" }}>
                Tushar Shetty
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="container2">
        {/*<h1>Welcome to the global chat!</h1>
          <h2>Hey {username}!</h2>*/}
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input
              className="app__input"
              placeholder="Enter a message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className="app__iconButton"
              disabled={!input}
              variant="contained"
              type="submit"
              onClick={sendMessage}
            >
              <SendIcon
                className="send__icon"
                style={{
                  opacity: "100%",
                }}
              />
            </IconButton>
            <ScrollUpButton
              style={{
                marginRight: "10px",
                marginBottom: "60px",
                outline: "none",
                opacity: "0%",
              }}
            />
          </FormControl>
          {/* Variant can be customized */}
        </form>

        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
            // <p>{message}</p>
          ))}
        </FlipMove>
      </div>
    </body>
  );
}

export default App;
// test1
