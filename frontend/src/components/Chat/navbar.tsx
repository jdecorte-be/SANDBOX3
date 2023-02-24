import {
    Avatar,
    Group,
    Paper,
    Text,
    Title,
    UnstyledButton,
  } from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";

export const NavbarChat = () => {

    return (
        <Paper

          radius={5}
          sx={{
            boxShadow: "0px 2px 0px 0px rgba(173,181,189,.5)",
            height: 60,
          }}
          style={{
            maxWidth: 200,
          }}
        >
          <Group
            p="sm"
            align="center"
          >
              <Avatar
                src={"https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"}
                radius="xl"
              />
            <Text>John Decorte</Text>
      
          </Group>
        </Paper>
    )
}