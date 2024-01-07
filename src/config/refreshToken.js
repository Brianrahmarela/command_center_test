'use client';

import { customRevalidatePath } from '@/lib/action';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Loading from '@/app/loading';
import { API } from '.';

const RefreshToken = () => {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');
  const accessTokenEmailDecode = jwt.decode(accessToken)?.email;

  const fetchData = async () => {
    const payload = {
      email: accessTokenEmailDecode,
    };
    const response = await API.POST('/refresh-token', payload, refreshToken);
    if (response.meta.message === 'success') {
      setCookie('access_token', response.data.content[0]?.access_token);
      setCookie('refresh_token', response.data.content[0]?.refresh_token);
      customRevalidatePath('/:path*');
    } else if (response.meta.message === 'data not found') {
      return;
    } else {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      window.location.reload();
    }

    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Loading />;
};

export default RefreshToken;
