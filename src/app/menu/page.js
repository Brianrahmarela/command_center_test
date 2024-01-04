import React from 'react'
import useAuthSession from '@/lib/useAuthSession';
import { API } from '@/config';
// import { redirect } from "next/navigation";
const getProfile = async (token) => {
  const response = await API.GET('/me', token);
  // console.log('response', response)

  if (response.meta.message === 'success') {
    return response;
  } else {
    throw new Error(response.meta.message);
  }
};
const Menu = async () => {
  const user = await useAuthSession();
  // console.log('USER DI PAGE MENU', user)
  const data = await getProfile(user?.user.access_token ?? '');
  // console.log('data', data)

  // if (user) {
  //   redirect('/dashboard');
  // } 
  return (
    <div>Menu</div>
  )
}

export default Menu