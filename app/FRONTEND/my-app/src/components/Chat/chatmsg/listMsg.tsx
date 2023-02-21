import { ActionIcon, Avatar, Button, Divider, Group, ScrollArea, Stack, TextInput, Text } from "@mantine/core";
import { getHotkeyHandler, useScrollIntoView } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MoodHappy, Send } from "tabler-icons-react";
import ChatBox from "./chatBox";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../query/query";
import { IoIosArrowBack } from "react-icons/io";

const ListMsg = ({data, setShowMessages} : any) => {

    const listmsg = useQuery(GET_MESSAGES, {
        variables: {
            uuid: data.uuid
        }
    });
    
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [listmsg]);
    
  return (
    <>
        <div className="divide-y divide-gray-200">
            <ActionIcon
            onClick={() => setShowMessages(false)}
            >
                <IoIosArrowBack
                    style={{ 
                        position: 'absolute',
                        top: 10,
                        left: 10,
                    }}
                >
                </IoIosArrowBack>
            </ActionIcon>

            <h4
            style={{
                position: 'absolute',
                right: '50%',
                top: 0
            }}
            >{data.chatname}</h4>

            <Divider my="sm" />

            {
                listmsg.data && listmsg.data.getMessages[0] ? 
                    <ScrollArea style={{ height: 450 }} scrollbarSize={8}>

                            {
                                listmsg.data && listmsg.data.getMessages.map((elem : {message: string, userID: string, createdAt: Date}) => {
                                    {
                                        return (
                                                <div style={{padding: "5px"}}>
                                                    {
                                                        elem.userID === "jdecorte" ?

                                                        <Group>
                                                            <Avatar size={40} color="blue">{elem.userID.slice(0,2).toUpperCase()}</Avatar>
                                                            <Text>{elem.message}</Text>
                                                        </Group>

                                                        :

                                                        <Group>
                                                            <Text>{elem.message}</Text>
                                                            <Avatar size={40} color="red">{elem.userID.slice(0,2).toUpperCase()}</Avatar>
                                                        </Group>
                                                    }
                                                </div>
                                        )
                                    }
                                })
                            }
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    :

                    <Text
                        c="dimmed"
                        size={15}
                    >No messages have been send.</Text>

                
            }
            <ChatBox uuid={data.uuid} refetch={listmsg.refetch}></ChatBox>
        </div>
    </>
  );
};

export default ListMsg;