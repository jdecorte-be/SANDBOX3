import { ActionIcon, Box, Card, CloseButton, Switch, Text } from '@mantine/core';
import { CreateChat } from "./createChat"
import { ListChat } from './listChat';
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "./query/query";
import { AskPassword } from "./askPassword";
import { NavbarChat } from "./navbar";
import { MoodHappy, Send } from "tabler-icons-react";
import { Fade, FormControlLabel, Modal } from "@mui/material";
import Popup from "reactjs-popup";
import { display, height } from '@mui/system';


export const Chat = () => {
    const [showCreateChat, setShowCreateChat] = useState(false);
    const [showChat, setShowChat] = useState(false);


    function toggleShowChat() {
        if(showChat)
            setShowChat(false);
        else
            setShowChat(true)
    }

    function toggleShowCreate() {
        if(showCreateChat)
            setShowCreateChat(false);
        else
            setShowCreateChat(true)
    }


    const chat_list = useQuery(GET_CHATS, {
        variables: { userID: "jdecorte"}
      });


      
    return (
        <>
            {
                showChat ? 
                <Fade in={showChat}>
                    <Card
                    withBorder
                        sx={(theme) => ({
                            width: 300,
                            height: 600,
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            borderRadius: 15,
                            position: "absolute",
                            bottom: 40,
                            right: 40,
                        })}
                    >
                        <CloseButton
                        size={20}
                        onClick={() => toggleShowChat()}
                        style={{
                            top: 25,
                            right: 25,
                            position: 'absolute'
                        }}/>

                        <div>
                   

                            
                            <Popup
                            open={showCreateChat}
                            onClose={() => setShowCreateChat(false)}
                            position="top center"
                            nested
                            modal
                            >
                                <CreateChat toggleShowCreate={toggleShowCreate} chat_list={chat_list}></CreateChat>
                            </Popup>

                            <ListChat toggleShowCreate={toggleShowCreate} chat_list={chat_list}><AskPassword></AskPassword></ListChat>
                        </div>

                    </Card>
                </Fade>

            :

                <ActionIcon
                onClick={() => toggleShowChat()}
                style={{
                    height: 80,
                    width: 80,
                    position: "absolute",
                    alignItems: "center",
                    bottom: 40,
                    right: 40,
                }} color="teal" radius="xl" variant="filled">
                    <Send size={30} />
                </ActionIcon>
            }
            </>
    )
}