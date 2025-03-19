import { Navigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid'; // 需要安装 uuid 包：npm install uuid @types/uuid

export const ChatNewCreate = () => {
  const newChatId = uuidv4();
  return <Navigate to={`/chat/${newChatId}`} replace />;
};

export default ChatNewCreate;
