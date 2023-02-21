import { gql } from '@apollo/client';

export const GET_CHATS = gql`
query GetChats($userID: String, $type: String) {
  aliveChats(userID: $userID, type: $type) {
    uuid
    name
    type
    ownerID
    userID
  }
}
`;
export const UPDATE_CHAT = gql`
mutation	UpdateChat($newinfo : UpdateChatInput!) {
  updateChat(updateChatInput: $newinfo) {
    uuid
  }
}
`;
export const CREATE_CHAT = gql`
mutation CreateChat($newChat: AddChatInput!) {
    addChat(addChatInput: $newChat) {
      uuid
      name
      type
      ownerID
      userID
    }
  }
`;
export const ADD_MESSAGE = gql`
mutation AddMessages($newMessage: AddMessageInput!) {
  addMessage(addMessageInput: $newMessage) {
    userID
    chatUUID
  }
}
`;
export const REMOVE_CHAT = gql`
mutation	RemoveChat($uuid : String!) {
  removeChat(uuid: $uuid) {
    uuid
  }
}
`;
export const GET_MESSAGES = gql`
query GetMessages($uuid: String!) {
  getMessages(uuid: $uuid) {
    chatUUID
    message
    userID
    createdAt
  }
}
`;
export const CHECK_PASSWORD = gql`
query checkPassword($uuid : String!, $pass: String!) {
  checkChatPassword(uuid: $uuid, password: $pass)
}
`;



