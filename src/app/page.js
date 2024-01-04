import LoginButton from "@/components/login/LoginButton";
import useAuthSession from "@/lib/useAuthSession"
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await useAuthSession()
  if (user) {
    redirect('/menu');
  } else{
    redirect('/login');
  }
  
  return (
      <LoginButton/>
  )
}
