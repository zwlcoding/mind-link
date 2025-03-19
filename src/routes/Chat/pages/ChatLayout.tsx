import { Layout } from "~/components/ui/Layout";
import { Outlet } from "react-router";

export const ChatLayout = () => {
  return (
    <Layout>
      <Layout.Header>
        {/* <SiteHeader /> */}
        <div>header</div>
      </Layout.Header>
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer>
        {/* <StatusBar /> */}
        <div>footer</div>
      </Layout.Footer>
    </Layout>
  );
}
