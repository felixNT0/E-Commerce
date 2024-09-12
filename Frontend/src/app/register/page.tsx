import RegisterView from "@/section/register";
import Layout from "../layout";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <Layout>
      <RegisterView />
    </Layout>
  );
}
