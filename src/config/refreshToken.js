'use client';

import { customRevalidatePath } from '@/lib/action';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Loading from '@/app/loading';

const RefreshToken = () => {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');
  const accessTokenEmailDecode = jwt.decode(accessToken)?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          {
            method: 'POST',
            body: JSON.stringify({ email: accessTokenEmailDecode }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken || null}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();

        await setCookie('access_token', user.data.content[0]?.access_token);
        await setCookie('refresh_token', user.data.content[0]?.refresh_token);
        await customRevalidatePath('/:path*');
        console.log('refresh token', user);
      } catch (error) {
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        window.location.reload();
      }
    };
    fetchData();
  }, [accessTokenEmailDecode, refreshToken]);

  return <Loading />;
};

export default RefreshToken;
