import { SiteSidebar } from '~/components/SiteSidebar';
import { SiteArticle } from '~/components/SiteArticle';
export const ChatBox = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SiteSidebar>
        <div>1234</div>
      </SiteSidebar>
      <SiteArticle>12121</SiteArticle>
      <SiteSidebar>
        <div>1234</div>
      </SiteSidebar>
    </div>
  );
};
export default ChatBox;
