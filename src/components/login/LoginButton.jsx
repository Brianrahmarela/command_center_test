'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

const LoginButton = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  }
  return (
    <Button onClick={handleLogin}>Login</Button>
    )
}

export default LoginButton