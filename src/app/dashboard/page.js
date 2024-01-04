import React from 'react'
import useAuthSession from '@/lib/useAuthSession';
import LogOutButton from '@/components/logout/LogOutButton';

const Dashboard = async () => {
  const user = await useAuthSession();
  // console.log('user dashboard', user)
  return (
    <div>DashboardPage
    <LogOutButton/>
    </div>
  )
}

export default Dashboard