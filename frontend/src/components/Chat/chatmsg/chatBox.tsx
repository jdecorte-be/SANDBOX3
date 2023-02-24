import { ActionIcon, Group, Popover, Stack, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { useState } from "react";
import { MoodHappy, Send } from "tabler-icons-react";
import { height } from '@mui/system';
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../query/query";

const ChatBox = ({uuid, refetch} : any) => {
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const [addMessage] = useMutation(ADD_MESSAGE, {
    onCompleted: () => {
        refetch();
    },
  });

  function sendMsg() {
    console.log("dfsdfsd")
    addMessage({variables: {newMessage: {chatUUID: uuid, userID: "jdecorte", message:value}}});
    setValue('');
    
  }


  return (
      <Stack sx={{ height: "8vh", bottom:0, position: 'absolute' }} justify="center" p={0}>
        <Group position="right">
          
          <TextInput
            onKeyDown={(e) => {
                if(e.keyCode === 13)
                  sendMsg();
              }
            }
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            sx={{ flexGrow: 1 }}
            placeholder="Say something nice . . . "
            rightSection={
              <ActionIcon
                onClick={() =>
                  setShowEmoji(true)
                }
              >
                <MoodHappy />
              </ActionIcon>
            }
     
          />
          <ActionIcon
            variant="outline"
            size="lg"
            onClick={() => sendMsg()}
            disabled={
              !/\S/.test(value) ? true : value.length < 2 ? true : false
            }
          >
            <Send />
          </ActionIcon>
        </Group>
      </Stack>
  );
};

export default ChatBox;