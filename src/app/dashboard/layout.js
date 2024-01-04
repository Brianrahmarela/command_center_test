import Sidebar from "@/components/layout/sidebar";
// import useAuthSession from "@/lib/useAuthSession";
// import { signIn } from "next-auth/react";

export default function Layout({ children }) {
  // const user = await useAuthSession();
	// if (user.error === 'RefreshAccessTokenError') {
  //   signIn();
	// }
  return (
    <div className="flex h-screen border-collapse overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
        {children}
      </main>
    </div>
  );
}
