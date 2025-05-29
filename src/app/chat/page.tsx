'use client'
import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('@/containers/chat/page'), {
  ssr: false, // disable SSR
});

export default ChatPage;