import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

import { ADD_MESSAGE, GET_CHATS, GET_MESSAGES, REMOVE_CHAT } from './query/query';
import { Alert, Avatar, Divider, Group, UnstyledButton, Text, ScrollArea, ActionIcon, Button, TextInput, Loader, Navbar } from "@mantine/core";
import { useState, useEffect } from 'react';
import { AiFillSetting, AiOutlineDelete, AiOutlineSetting } from 'react-icons/ai';
import { HeadChat } from './headchat';
import { NavbarChat } from './navbar';
import ListMsg from './chatmsg/listMsg';
import Popup from 'reactjs-popup';
import { AskPassword } from './askPassword';
import { EditChat } from './editchat';


export const ListChat = ({toggleShowCreate, chat_list} : any) => {
    const [showMessages, setShowMessages] = useState(false);
    const [showAskPassword, setShowAskPassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);


    const [dataChat, setDataChat] = useState({
        uuid: '',
        chatname: '',
        type: '',
    });

    /* -------------------------------------------------------------------------- */
    /*                                   Toggle                                   */
    /* -------------------------------------------------------------------------- */

    function toggleShowPassword() {
        if(showAskPassword)
            setShowAskPassword(false)
        else
            setShowAskPassword(true);
    }

    function toggleShowMessages() {
        if(showMessages)
            setShowMessages(false)
        else
            setShowMessages(true);
    }

    function toggleShowEdit() {
        if(showEdit)
            setShowEdit(false)
        else
            setShowEdit(true);
    }

    /* -------------------------------------------------------------------------- */
    /*                             Mutation and query                             */
    /* -------------------------------------------------------------------------- */
    const [onRemoveHandler] = useMutation(REMOVE_CHAT, {
        onCompleted: () => {
            chat_list.refetch();
        },
    });


    
    function openPublicChat(uuid: string, groupname: string, type: string) {
        setDataChat({uuid: uuid, chatname: groupname, type: type});
        toggleShowMessages();
    }

    function openPrivateChat(uuid: string, groupname: string, type: string) {
        setDataChat({uuid: uuid, chatname: groupname, type: type});
        toggleShowPassword()
    }


    return (
        <div className="py-3 px-5">
            <Popup
            open={showAskPassword}
            onClose={() => setShowAskPassword(false)}
            position="top center"
            modal
            nested
            >
                <AskPassword togglePassword={toggleShowPassword} toggleShowMessages={toggleShowMessages} uuid={dataChat.uuid}></AskPassword>
            </Popup>

            <Popup
            open={showEdit}
            onClose={() => setShowEdit(false)}
            position="top center"
            modal
            nested
            >
                <EditChat toggleEdit={toggleShowEdit} data={dataChat} chat_list={chat_list}></EditChat>
            </Popup>

            {
                showMessages ?
                    <ListMsg data={dataChat} setShowMessages={setShowMessages}></ListMsg>

                :

                    <>
                        <NavbarChat></NavbarChat>
                        <ScrollArea
                            style={{
                                height: 450,
                                paddingTop: 10,
                            }}
                            scrollbarSize={5}
                            offsetScrollbars
                            
                        >
                            <h4>public</h4>
                            <Divider my="sm"/>

                                {
                                    chat_list.data && chat_list.data.aliveChats.map((elem : {name : string, ownerID: string, uuid : string, type: string}) => {
                                        return (
                                            elem.type === "public" &&
                                            <div style={{padding: "5px"}}>

                                                    <Group>
                                                        <UnstyledButton
                                                        onClick={() => {
                                                            openPublicChat(elem.uuid, elem.name, elem.type);
                                                        }}
                                                        >
                                                            <Group>
                                                                <Avatar size={40} color="blue">{elem.name.slice(0,2).toUpperCase()}</Avatar>
                                                                <Text>{elem.name}</Text>
                                                            </Group>
                                                        </UnstyledButton>
                                                        {
                                                            elem.ownerID === "jdecorte" &&
                                                            <Group>
                                                                <ActionIcon
                                                                    
                                                                    onClick={() => onRemoveHandler({variables : {uuid: elem.uuid}})}
                                                                ><AiOutlineDelete size={20} color="red"></AiOutlineDelete></ActionIcon>
                                                                <ActionIcon
                                                                    onClick={() => {
                                                                        toggleShowEdit();
                                                                        setDataChat({uuid: elem.uuid, chatname: elem.name, type: elem.type});
                                                                    }
                                                                    }
                                                                ><AiOutlineSetting size={20}></AiOutlineSetting></ActionIcon>
                                                            </Group>
                                                        }
                                                    </Group>
                                            </div>
                                        )
                                    })
                                }

                            <h4>private</h4>
                            <Divider my="sm" />

                            {
                                    chat_list.data && chat_list.data.aliveChats.map((elem : {name : string, ownerID: string, uuid : string, type: string}) => {
                                        return (
                                            elem.type === "private" &&
                                            <div style={{padding: "5px"}}>

                                                    <Group>
                                                        <UnstyledButton
                                                        onClick={() => {
                                                            openPrivateChat(elem.uuid, elem.name, elem.type);
                                                        }}
                                                        >
                                                            <Group>
                                                                <Avatar size={40} color="blue">{elem.name.slice(0,2).toUpperCase()}</Avatar>
                                                                <Text>{elem.name}</Text>
                                                            </Group>
                                                        </UnstyledButton>
                                                        {
                                                            elem.ownerID === "jdecorte" &&
                                                            <Group>
                                                                <ActionIcon
                                                                    
                                                                    onClick={() => onRemoveHandler({variables : {uuid: elem.uuid}})}
                                                                ><AiOutlineDelete size={20} color="red"></AiOutlineDelete></ActionIcon>
                                                                <ActionIcon
                                                                    onClick={() => setShowEdit(true)}
                                                                ><AiOutlineSetting size={20}></AiOutlineSetting></ActionIcon>
                                                            </Group>
                                                        }
                                                    </Group>
                                            </div>
                                        )
                                    })
                                }
                        </ScrollArea>

                        <Button
                        style={{
                            bottom:25,
                            left: 15,
                            position: 'absolute',

                        }}
                        radius="lg" onClick={() => toggleShowCreate(true)}>
                            Add Group
                        </Button>
                    </>
                }
            </div>
    )
}