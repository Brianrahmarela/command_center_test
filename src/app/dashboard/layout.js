import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function Layout({ children }) {
  return (
    <div className='flex h-screen border-collapse overflow-hidden  mt-16 md:mt-0'>
      <div className={cn('block md:!hidden')}>
        <Header />
      </div>
      <Sidebar />
      <main className='flex-1 overflow-y-auto overflow-x-hidden p-10 bg-secondary/10'>
        {children}
      </main>
    </div>
  );
}
