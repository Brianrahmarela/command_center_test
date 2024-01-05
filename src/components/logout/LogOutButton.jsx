'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCookie } from 'cookies-next';

const LogOutButton = () => {
  const handleLogOut = async () => {
    await deleteCookie('access_token');
    await deleteCookie('refresh_token');
    window.location.reload();
  };

  return (
    <Button onClick={handleLogOut}>Log Out</Button>
    )
}

export default LogOutButton