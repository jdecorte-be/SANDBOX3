
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { ActionIcon, Alert, Button, Card, Center, PasswordInput, TextInput, Text, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ADD_MESSAGE, CHECK_PASSWORD, UPDATE_CHAT } from './query/query';



export const EditChat = ({toggleEdit, data, chat_list} : any) => {
    const [enterName, setEnterName] = useState('');
    const [enterPassword, setEnterPassword] = useState('');
    const [type, setType] = useState(data.type);



    /* -------------------------------------------------------------------------- */
    /*                             Mutation and query                             */
    /* -------------------------------------------------------------------------- */
    const [update_chat] = useMutation(UPDATE_CHAT, {
        onCompleted: () => {
            chat_list.refetch()
        },
      });



    return (
      <Card
      withBorder
      sx={{
        borderRadius: 15,
      }}
      style={{
        padding: 15,
        position: 'absolute',
        width:250,
      }}
    >
      <form>
          <ActionIcon
              onClick={() => toggleEdit()}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
              }}
            ><IoMdClose size={15}></IoMdClose>
          </ActionIcon>
          <TextInput
            placeholder="group name.."
            label="Group name"
            variant="filled"
            onChange={e => setEnterName(e.target.value)}
            defaultValue={data.chatname}
            />
            {
                type === 'private' ?
                <PasswordInput
                  label="Password :"
                  placeholder="your password.."
                  onChange={e => setEnterPassword(e.target.value)}
                  // defaultValue={}
                />
                :
                <></>
            }
        <SegmentedControl
            style={{
              marginTop: 10
            }}
            value={type}
            onChange={setType}
            data={[
              { label: 'Public', value: 'public'},
              { label: 'Private', value: 'private' },
            ]}
          />

          <Button
          style={{
            marginLeft: 10
          }}
          onClick= {() =>
            update_chat({variables: {
            newinfo : {
                uuid: data.uuid,
                name: enterName,
                type: type,
                password: type === 'public' ? "" : enterPassword
            }
          }})}
          >Edit</Button>
        </form>
    </Card>
    )
}