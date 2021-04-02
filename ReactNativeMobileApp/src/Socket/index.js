import io from 'socket.io-client';
import {
  SENT_MESSAGE,
  FETCH_GROUP,
  JOIN_GROUP,
  URI,
  GROUP_USERS,
  OLD_MESSAGES,
  MESSAGES,
  LEAVE_GROUP,
  READ_MESSAGE,
  GROUPS,
  UNREAD_MESSAGE_COUNT,
  JOIN_GROUP_RIDE,
  LEAVE_GROUP_RIDE,
  SEND_LIVE_LOCATION,
  GROUP_LIVE_LOCATION,
  NEW_USER_JOIN_RIDE,
  FETCH_GROUP_USERS,
} from './constants';
let socket;

export const initializeSocket = () => {
  socket = io(URI);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const fetchGroupsSocket = ({auth_token, is_ride_out = false}) => {
  if (socket) {
    socket.emit(FETCH_GROUP, {auth_token, is_ride_out});
  }
};

export const joinGroupSocket = ({auth_token, group_id}) => {
  if (socket) {
    socket.emit(JOIN_GROUP, {auth_token, group_id});
  }
};

export const leaveGroupSocket = ({auth_token}) => {
  if (socket) {
    socket.emit(LEAVE_GROUP, {auth_token});
  }
};

export const readMessageSocket = ({auth_token, group_id}) => {
  if (socket) {
    socket.emit(READ_MESSAGE, {auth_token, group_id});
  }
};
export const fetchGroupUsersSocket = ({auth_token, group_id}) => {
  if (socket) {
    socket.emit(FETCH_GROUP_USERS, {auth_token, group_id});
  }
};

export const sendMessageSocket = (newMessages) => {
  if (socket) {
    socket.emit(SENT_MESSAGE, newMessages);
  }
};

export const loadGroupDetailSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(GROUP_USERS, (data) => {
    cb(data);
  });
};

export const loadInitialChatSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(OLD_MESSAGES, (data) => {
    if (data?.messages?.error) {
      cb([]);
    } else {
      cb(data?.messages);
    }
  });
};

export const loadMessagesSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(MESSAGES, (data) => {
    cb(data);
  });
};

export const loadGroupsSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(GROUPS, (data) => {
    cb(data);
  });
};

export const unreadMessageCountSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(UNREAD_MESSAGE_COUNT, (data) => {
    console.log('unread message count...', data);
    cb(data);
  });
};

export const joinGroupRideSocket = ({auth_token, group_id = 1056}) => {
  if (socket) {
    socket.emit(JOIN_GROUP_RIDE, {auth_token, group_id});
  }
};

export const leaveGroupRideSocket = ({auth_token, group_id = 1056}) => {
  if (socket) {
    socket.emit(LEAVE_GROUP_RIDE, {auth_token, group_id});
  }
};
export const newUserJoinRideSocket = ({
  auth_token,
  group_id,
  location_data,
}) => {
  if (!socket) {
    return true;
  }
  socket.on(NEW_USER_JOIN_RIDE, () => {
    socket.emit(SEND_LIVE_LOCATION, {auth_token, group_id, location_data});
  });
};

export const sendLiveLocationSocket = ({
  auth_token,
  group_id = 1056,
  location_data,
}) => {
  if (socket) {
    socket.emit(SEND_LIVE_LOCATION, {auth_token, group_id, location_data});
  }
};

export const groupLiveLocationSocket = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on(GROUP_LIVE_LOCATION, (data) => {
    cb(data);
  });
};
