'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { signOut } from 'next-auth/react';

const LogOutButton = () => {
  const handleLogOut = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login` ?? '',
    });

  };

  return (
    <Button onClick={handleLogOut}>Log Out</Button>
    )
}

export default LogOutButton