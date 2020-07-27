// e7 snippets
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {forwardRef} from "react";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import './Message.css';

const Message = forwardRef(({message, username}, ref) => {
  const isUser = username === message.username;

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const classes = useStyles();

  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"} style={{borderRadius: '40%', border:"80 px", borderStyle:'groove', borderColor:'grey'}}>
        <CardContent>
          <Typography className={classes.title} style={{textAlign: 'left', fontWeight: 'bold'}}>
          {!isUser && `${message.username || "Unknown user"}`}
          </Typography>
          <Typography className="time"
            color="white"
            variant="h5"
            component = "h2"
            style={{display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>

                {message.message}
                <span className="time"> 
                {message.time}
                </span>
            </Typography>
        </CardContent>
      </Card>
    </div>
  );
})

export default Message;