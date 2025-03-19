import { Layout } from "~/components/Layout";
import { Outlet } from "react-router";
import {SiteHeader} from '~/components/SiteHeader'
import {StatusBar} from '~/features/StatusBar'

export const ChatLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        <SiteHeader />
      </Layout.Header>
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer>
        <StatusBar />
      </Layout.Footer>
    </Layout>
  );
}

export default ChatLayout