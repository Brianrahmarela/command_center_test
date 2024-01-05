'use client';

import { customRevalidatePath } from '@/lib/action';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const RefreshToken = ({path}) => {
  const accessToken = getCookie('access_token');
  console.log('accessToken getcookie', accessToken)
  const refreshToken = getCookie('refresh_token');
  console.log('refreshToken getcookie', refreshToken)

  const accessTokenEmailDecode = jwt.decode(accessToken)?.email;
  console.log('accessTokenEmailDecode',accessTokenEmailDecode)

  useEffect(() => {
    console.log('UE komp RefreshToken JLN!')
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          {
            method: 'POST',
            body: JSON.stringify({ email: accessTokenEmailDecode}),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken || null}`,
            },
          }
        );
        console.log('response /refresh-token', response)
        

        if (!response.ok) {
          throw new Error(HTTP `error! Status: ${response.status}`);
        }

        const user = await response.json();
        console.log('RES NEW ACCESS TOKEN ', user.data)

        await deleteCookie('access_token');

        await setCookie('access_token', user.data.content[0]?.access_token, {
          maxAge: user.data.content[0]?.expired_access_token,
        });
        await setCookie('refresh_token', user.data.content[0]?.refresh_token);

        //     setCookie(name, value, {...options, cookies });
        customRevalidatePath(path);
        
      } catch (error) {
        console.error('Error refreshing token:', error);

        deleteCookie('access_token');
        deleteCookie('refresh_token');
        window.location.reload();
      }
    };

    fetchData();
  }, [refreshToken]);

  return <div>Loading...</div>;
};

export default RefreshToken;