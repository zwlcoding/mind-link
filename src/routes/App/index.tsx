import './index.less';
import { ChatSidebar } from '~/components/common/ChatSidebar';
// import Aside from '~/components/Aside'
import { Article } from '~/components/ui/Article';
import { Chat } from '~/features/Chat';
import { ChatList } from '~/features/ChatList';
// import ModelConfig from '~/features/ModelConfig'

const Index = () => {
  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar>
          <ChatList />
        </ChatSidebar>
        <Article>
          <Chat />
        </Article>
      </div>
    </>
  );
};

export default Index;
