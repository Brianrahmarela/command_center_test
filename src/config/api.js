import axios from 'axios';

export const GET = async (path, token, params) => {
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

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const POST = async (path, data, token) => {
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

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const PATCH = async (path, data, token) => {
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
    return error.response.data;
  }
};

export const PATCH_UPLOAD = async (path, data, token) => {
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
    return error.response.data;
  }
};

export const DELETE = async (path, token) => {
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
    return error.response.data;
  }
};
