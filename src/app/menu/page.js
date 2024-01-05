import React from "react";
import { API } from "@/config";
// import { CardBtn } from "@/components/menu/CardBtn";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import RefreshToken from "@/config/refreshToken";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
const getProfile = async (token) => {
  const response = await API.GET("/me", token);
  // console.log('response get/me', response)
  return response
  // const res = response.json()
  // console.log('res'), res

  // if (response.meta.message === "success") {
  //   return response;
  // } else {
  //   console.log('err response', response.meta.message)
  //   // throw new Error(response.meta.message);
    
  // }
};


const Menu = async () => {
  const cookie = cookies()
  const token = cookie.get('access_token')?.value
  console.log('token in menu', token)
  const data = await getProfile(token ?? '')
  console.log('data get profile', data)
  if(data.meta.code === 401){
    console.log('token expired')
    return <RefreshToken path='/menu'/>
  }
  return (
    <div className=" flex justify-center  items-center h-screen gap-10  p-10">
      <Button asChild variant="outline" className="rounded-lg w-1/2 md:w-1/4 h-1/4 shadow-lg  ">
      <Link href="/dashboard" className="w-1/2 md:w-1/4 h-1/4 shadow-lg ">
          <Icons.agent className="mr-2 h-6 w-6" />
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Agent
          </h3>
        </Link>
      </Button>
      <Button asChild variant="outline" className="rounded-lg w-1/2 md:w-1/4 h-1/4 shadow-lg  ">
      <Link href="/dashboard" className="w-1/2 md:w-1/4 h-1/4 shadow-lg ">
          <Icons.kiosK className="mr-2 h-6 w-6" />
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Kios-K
          </h3>
        </Link>
      </Button>
    </div>
  );
};

export default Menu;
