import { useQuery, useLazyQuery } from '@apollo/client';
import { ActionIcon, Alert, Button, Card, Center, PasswordInput, TextInput } from '@mantine/core';
import { height } from '@mui/system';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CHECK_PASSWORD } from './query/query';



export const AskPassword = ({togglePassword, toggleShowMessages, uuid} : any) => {
    const [enterPassword, setEnterPassword] = useState('');

    const [check_password, {data}] = useLazyQuery(CHECK_PASSWORD, {
        onCompleted: async () => {
          if(data.checkChatPassword === true) {
            toggleShowMessages();
            togglePassword();
          }
        }
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
        height:120,
        width:250,
      }}
    >
      <form>
          <ActionIcon
              onClick={() => togglePassword()}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
              }}
            ><IoMdClose size={15}></IoMdClose>
          </ActionIcon>

          <PasswordInput
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  check_password({variables: {uuid: uuid, pass: enterPassword}});

                }

              }
            }
            label="Password :"
            placeholder="your password.."
            onChange={e => setEnterPassword(e.target.value)}
          />
          <Button
          onClick= {() => check_password({variables: {uuid: uuid, pass: enterPassword}})}
          >Confirm</Button>
        </form>

    </Card>
    )
}