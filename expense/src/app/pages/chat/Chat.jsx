import React, { useContext, useEffect, useState } from "react";
import api from "../../service/api";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

const socket = io("http://192.168.31.55:4200");

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const { userData } = useContext(AuthContext);
  const [unReadCount, setUnreadCount] = useState([]);

  const getUsers = async () => {
    const result = await api.get("/user");
    const list = result?.data?.data;
    if (result?.data?.success) {
      setUsers(list);
    }
  };

  const getunreadCount = async (userId) => {
    const result = await api.get(`/message/${userId}`);
    setUnreadCount(result?.data?.data);
  };

  useEffect(() => {
    if (userData?.user?.id) {
      setSenderId(userData.user.id);
      socket.emit("joinRoom", userData.user.id);
      getunreadCount(userData.user.id);
    }
    getUsers();
  }, [userData]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (
        message.senderId === selectedUser?.id ||
        message.receiverId === selectedUser?.id
      ) {
        setMessages((prev) => [...prev, message]);
      }
      getunreadCount(userData?.user?.id);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser, userData]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setReceiverId(user?.id);
    const result = await api.get("/message", {
      params: {
        senderId: userData.user.id,
        receiverId: user.id,
      },
    });
    if (result) {
      await api.put("/message", {
        receiverId: userData.user.id,
        senderId: user?.id,
        updateData: { read: true },
      });
    }
    const messages = result?.data?.data;
    setMessages(messages);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const msgData = {
      message: newMsg,
      senderId: senderId,
      receiverId: receiverId,
      read: false,
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, msgData]);
    setNewMsg("");
  };

  return (
    <Box sx={{ display: "flex", height: "90vh", bgcolor: "#f9f9f9" }}>
      <Paper
        elevation={3}
        sx={{
          width: 300,
          height: "100%",
          borderRadius: 0,
          overflowY: "auto",
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
          Chats
        </Typography>
        <Divider />
        <List>
          {users?.map((user) => (
            <React.Fragment key={user?.id}>
              <ListItem
                onClick={() => handleUserClick(user)}
                selected={selectedUser?.id === user?.id}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "orange" }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user?.name}
                  secondary="Click to chat"
                  primaryTypographyProps={{ fontWeight: "500" }}
                />
                {unReadCount?.map((unr) =>
                  Object.keys(unr)[0] === user?.id ? (
                    <ListItemText key={unr}>
                      <div
                        style={{
                          backgroundColor: "#039637",
                          maxWidth: "15px",
                          width: "15px",
                          padding: "5px",
                          textAlign: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        {unr[Object.keys(unr)[0]]}
                      </div>
                    </ListItemText>
                  ) : (
                    ""
                  )
                )}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selectedUser ? (
          <>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Avatar sx={{ bgcolor: "orange", mr: 2 }}>
                {selectedUser?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6">{selectedUser?.name}</Typography>
            </Paper>

            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: msg.senderId === senderId ? "flex-end" : "flex-start",
                    bgcolor: msg.senderId === senderId ? "#1976d2" : "#eee",
                    color: msg.senderId === senderId ? "#fff" : "#000",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "60%",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.message}
                </Box>
              ))}
            </Box>

            <form>
              <Paper
                elevation={3}
                sx={{ p: 1, display: "flex", alignItems: "center" }}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <IconButton type="submit" color="primary" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Paper>
            </form>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "gray",
            }}
          >
            <Typography variant="h6">Select a user to start chat</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
