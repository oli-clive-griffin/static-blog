import Link from 'next/link';
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-50 mb-8 py-4 bg-white border-b border-b-gray-200'>
        <div className='container mx-auto flex justify-start px-4'>
          <Link href='/'>
            <a className='font-bold'>Oli Clive-Griffin</a>
          </Link>
          <div className='w-16'/>
          {/* <Link href='/writing'>
            <a>Writing</a>
          </Link> */}
        </div>
      </header>
      <main className='container mx-auto flex-1'>
        {children}
      </main>
    </div>
  );
}
