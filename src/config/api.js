'use server'

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import refreshToken from './refreshToken';

const token = getCookie('access_token')?.value ?? '';
console.log('token', token)
const refresh_token = getCookie('refresh_token')?.value;
const tokenEmail = jwt.decode(token)?.email;

export const GET = async (path, token, params) => {
  console.log(path)
  console.log(token)
  console.log(params)
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      {
        headers: header,
        params,
      }
    );
    // console.log('response GET', response)

    return response.data;
  } catch (error) {
    console.log('error', error.response.data)
    // if (error.response.data.meta?.code === 401) {
    //    refreshToken(tokenEmail, refresh_token);
    // }

    return error.response.data;
  }
};

export const POST = async (path, data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      data,
      {
        headers: header,
      }
    );
    // console.log('response login api', response)

    return response.data;
  } catch (error) {
    // if (error.response.data.meta?.code === 401) {
    //   refreshToken(tokenEmail);
    // }

    return error.response.data;
  }
};

export const POST_REFRESH_TOKEN = async (path, data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${refresh_token || null}`,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      data,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    // if (error.response.data.meta?.code === 401) {
    //   refreshToken(tokenEmail);
    // }

    return error.response.data;
  }
};

export const PATCH = async (path, data) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      data,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    // if (error.response.data.meta?.code === 401) {
    //   refreshToken(tokenEmail);
    // }

    return error.response.data;
  }
};

export const PATCH_UPLOAD = async (path, data) => {
  const header = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const formData = new FormData();

    for (const [val, name] of Object.entries(data)) {
      formData.append(val, name);
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      data,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    // if (error.response.data.meta?.code === 401) {
    //   refreshToken(tokenEmail);
    // }

    return error.response.data;
  }
};

export const DELETE = async (path) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    // if (error.response.data.meta?.code === 401) {
    //   refreshToken(tokenEmail);
    // }

    return error.response.data;
  }
};
