"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 로딩 컴포넌트
function Loading() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">데이터 처리 중..</h2>
    </div>
  );
}

// 검사 항목별 카드 컴포넌트
function CheckCard({ title, apiUrl, buttonText }) {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
  
    const handleCheck = async () => {
      setLoading(true);
      try {
        let response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setResponseData(data);
        } else {
          throw new Error("Data fetching error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const renderValue = (value) => {
      // 객체일 경우 JSON.stringify로 문자열로 변환하여 표시
      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value);
      }
      // Boolean 값 표시
      if (typeof value === "boolean") {
        return value ? "True" : "False";
      }
      return value; // 기본값 반환
    };
  
    return (
      <div className="border p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <Button onClick={handleCheck} disabled={loading}>
          {loading ? "Loading..." : buttonText}
        </Button>
        {loading && <Loading />}
        {responseData && (
          <div className="mt-4">
            {/* summary 정보 렌더링 */}
            {responseData.summary ? (
              <div className="mb-4">
                <p><strong>Accessible Count:</strong> {responseData.summary.accessible_count}</p>
                <p><strong>Accessible Percentage:</strong> {responseData.summary.accessible_percentage}%</p>
                <p><strong>Total Elements:</strong> {responseData.summary.total_elements}</p>
              </div>
            ) : null}
            {/* 결과 테이블 렌더링 */}
            {responseData.results && responseData.results.length > 0 ? (
              <table className="min-w-full bg-white mt-4">
                <thead>
                  <tr>
                    {Object.keys(responseData.results[0]).map((key) => (
                      <th key={key} className="py-2 px-4 border-b">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responseData.results.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value, idx) => (
                        <td key={idx} className="py-2 px-4 border-b">
                          {renderValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-2">결과가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    );
  }

export default function Home() {
  const params = useSearchParams();
  const value_url = params.get("url");

  // API URLs with the query parameter
  const videoCaptionUrl = `http://192.168.0.4:5500/video_caption?url=${value_url}`;
  const contrastUrl = `http://192.168.0.4:5500/contrast?url=${value_url}`;
  const keyboardUrl = `http://192.168.0.4:5500/keyboard?url=${value_url}`;
  const focusUrl = `http://192.168.0.4:5500/focus?url=${value_url}`;
  const tableStructureUrl = `http://192.168.0.4:5500/table_structure?url=${value_url}`;
  const labelUrl = `http://192.168.0.4:5500/label?url=${value_url}`;
  const altTextUrl = `http://192.168.0.4:5500/alt_text?url=${value_url}`;

  return (
    <main className="m-16 mt-20">
      <p className="Pretendard-Bold">{value_url}</p>
      <h1 className="Pretendard-Bold text-2xl mb-4">
        접근성 검사 리포트 <strong className="Pretendard-Regular text-sm">Beta</strong>
      </h1>
      <CheckCard
        title="비디오 접근성 검사 (Video Caption)"
        apiUrl={videoCaptionUrl}
        buttonText="비디오 접근성 검사 시작"
      />
      <CheckCard
        title="명도 대비 검사 (Contrast Check)"
        apiUrl={contrastUrl}
        buttonText="명도 대비 검사 시작"
      />
      <CheckCard
        title="키보드 접근성 검사 (Keyboard Accessibility)"
        apiUrl={keyboardUrl}
        buttonText="키보드 접근성 검사 시작"
      />
      <CheckCard
        title="초점 이동 검사 (Focus Navigation)"
        apiUrl={focusUrl}
        buttonText="초점 이동 검사 시작"
      />
      <CheckCard
        title="표 검사 (Table Structure)"
        apiUrl={tableStructureUrl}
        buttonText="표 검사 시작"
      />
      <CheckCard
        title="레이블 제공 확인 (Label Check)"
        apiUrl={labelUrl}
        buttonText="레이블 제공 확인 시작"
      />
      <CheckCard
        title="대체 텍스트 검사 (Alt Text Check)"
        apiUrl={altTextUrl}
        buttonText="대체 텍스트 검사 시작"
      />
    </main>
  );
}