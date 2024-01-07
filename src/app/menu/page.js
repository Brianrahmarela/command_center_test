import React from 'react';
import { API } from '@/config';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Link from 'next/link';
import RefreshToken from '@/config/refreshToken';
import { cookies } from 'next/headers';

const getProfile = async (token) => {
  const response = await API.GET('/me', token);
  return response;
};

const Menu = async () => {
  const token = cookies().get('access_token')?.value;
  const data = await getProfile(token);

  if (data.meta.code === 401) {
    return <RefreshToken />;
  }

  return (
    <div className=' flex justify-center  items-center h-screen gap-10  p-10'>
      <Button
        asChild
        variant='outline'
        className='rounded-lg w-1/2 md:w-1/4 h-1/4 shadow-lg  '
      >
        <Link href='/dashboard' className='w-1/2 md:w-1/4 h-1/4 shadow-lg '>
          <Icons.agent className='mr-2 h-6 w-6' />
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Agent
          </h3>
        </Link>
      </Button>
      <Button
        asChild
        variant='outline'
        className='rounded-lg w-1/2 md:w-1/4 h-1/4 shadow-lg  '
      >
        <Link href='/dashboard' className='w-1/2 md:w-1/4 h-1/4 shadow-lg '>
          <Icons.kiosK className='mr-2 h-6 w-6' />
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Kios-K
          </h3>
        </Link>
      </Button>
    </div>
  );
};

export default Menu;
