import LoginView from "@/section/login";
import Layout from "../layout";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Layout>
      <LoginView />
    </Layout>
  );
}
