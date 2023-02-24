import { gql, useMutation, useQuery } from '@apollo/client';
import { TextInput, Checkbox, Button, Group, Box, SegmentedControl, PasswordInput, Loader, ActionIcon, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { CREATE_CHAT, GET_CHATS } from './query/query';
import { AskPassword } from './askPassword';
import { IoMdClose } from 'react-icons/io';
import { showNotification } from '@mantine/notifications';


export const CreateChat = ({toggleShowCreate, chat_list} : any) => {

  const [groupname, setGroupName] = useState('');
  const [type, setType] = useState('public');
  const [password, setPassword] = useState('');

  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      chat_list.refetch();
    }
  });


  const onClickCreateChat = () => {
    createChat({
      variables: {
        newChat : { name: groupname, type: type, password: password, ownerID: "jdecorte", userID: ["jdecorte"] },
      }
    }).then(({data}) => {
      // showNotification({
      //   title: 'Add Group',
      //   message: 'Group ' + groupname + ' as been',
      // })
      toggleShowCreate()
    })
    .catch(e => {
      // if(groupname === "") {
      //   showNotification({
      //     title: 'Error : ',
      //     message: 'Put a groupname',
      //     color: 'red',
      //   })
      // }
      // else {
      //   showNotification({
      //     title: 'Error : ',
      //     message: 'Select a type',
      //     color: 'red',
      //   })
      // }
    })
  }


  return (
    <Card
      withBorder
      sx={{
        borderRadius: 15,
      }}
      style={{
        padding: 15,
        position: 'absolute',
        width: 250
      }}
    >
      <form>
          <ActionIcon
              onClick={() => toggleShowCreate()}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
              }}
            ><IoMdClose size={15}></IoMdClose>
          </ActionIcon>

          <TextInput
            withAsterisk
            label="Chat name"
            placeholder="my chat name.."
            onChange={e => setGroupName(e.target.value)}
          />
            {
              type === 'private' ? 
              <PasswordInput
                value={password}
                onChange={e => setPassword(e.target.value)}
                withAsterisk
                label="Password"
                placeholder="password.."
              />
              :
              <div></div>
            }

          <SegmentedControl
            style={{
              marginTop: 10
            }}
            value={type}
            onChange={setType}
            data={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
          />

            <Button
            style={{
              marginLeft: 10,
            }}
            onClick={() => onClickCreateChat()}>Add</Button>
        </form>

    </Card>
  );
}