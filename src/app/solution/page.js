// src/app/solution/page.js
import { Suspense } from 'react';
import CardContainer from './CardContainer'; // 클라이언트 컴포넌트로 분리

export default function Home({ searchParams }) {
    const value_url = searchParams?.url || ""; // URL 파라미터를 서버에서 읽어 클라이언트 컴포넌트로 전달
  
    return (
      <main className="m-16 mt-20">
        <p className="Pretendard-Bold">{value_url}</p>
        <h1 className="Pretendard-Bold text-2xl mb-4">
          접근성 검사 리포트 <strong className="Pretendard-Regular text-sm">Beta</strong>
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <CardContainer valueUrl={value_url} /> {/* URL을 프롭스로 전달 */}
        </Suspense>
      </main>
    );
  }