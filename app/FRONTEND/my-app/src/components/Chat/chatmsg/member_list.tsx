

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { Alert, Avatar, Divider, Group, UnstyledButton, Text, ScrollArea, ActionIcon, Button, TextInput, Loader, Navbar } from "@mantine/core";
import { useState, useEffect } from 'react';
import { AiFillSetting, AiOutlineAudioMuted, AiOutlineDelete, AiOutlineSetting } from 'react-icons/ai';
import { GrUpgrade } from 'react-icons/gr';
import { ImBlocked } from 'react-icons/im';
import { IoMdExit } from 'react-icons/io';
import { BiBlock } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import { MUTE, UPDATE_CHAT, KICK, ADMIN } from '../query/query';


export const MemberList = ({data} : any) => {
 

    const [mute] = useMutation(MUTE, {
        onCompleted: () => {
            // chat_list.refetch()
        },
      });

    const [kick] = useMutation(KICK, {
        onCompleted: () => {
            // chat_list.refetch()
        },
      });

    const [promote] = useMutation(ADMIN, {
        onCompleted: () => {
            // chat_list.refetch()
        },
      });

    return (
        <>
            <ScrollArea style={{ height: 450 }} scrollbarSize={8}>

            {
                data.userID && data.userID.map((elem : string) => {
                    return (
                        <div style={{padding: "5px"}}>
                            <Group>
                                <Avatar size={40} color="blue">{elem.slice(0,2).toUpperCase()}</Avatar>
                                <Text>{elem}</Text>
                                <ActionIcon            
                                    onClick={() => mute({variables: {
                                        uuid: data.uuid,
                                        userID: elem,
                                    }})}
                                ><GrUpgrade size={20} color="green"></GrUpgrade></ActionIcon>
                                <ActionIcon
                                    onClick={() => kick({variables: {
                                        uuid: data.uuid,
                                        userID: elem,
                                    }})}
                                ><BiBlock size={20} color="red"></BiBlock></ActionIcon>
                                <ActionIcon
                                    onClick={() => promote({variables: {
                                        uuid: data.uuid,
                                        userID: elem,
                                    }})}
                                ><IoMdExit size={20} color="red"></IoMdExit></ActionIcon>
                            </Group>
                        </div>
                    )
                })
            }

            </ScrollArea>
        </>
    )
}