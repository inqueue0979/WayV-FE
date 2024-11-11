'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

function Loading() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">데이터 처리 중..</h2>
    </div>
  );
}

function CheckCard({ title, apiUrl, buttonText }) {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setResponseData(data);
      } else {
        throw new Error('Data fetching error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // renderValue 함수를 배열과 객체에 맞게 수정합니다.
  const renderValue = (value) => {
    if (Array.isArray(value)) {
      // 배열의 경우 각 항목을 테이블로 렌더링
      if (value.length === 0) return <p>데이터가 없습니다.</p>;
      return (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              {Object.keys(value[0]).map((key) => (
                <th key={key} className="py-2 px-4 border-b">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((v, idx) => (
                  <td key={idx} className="py-2 px-4 border-b">{v !== null ? v.toString() : 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (typeof value === 'object' && value !== null) {
      // 객체의 경우 키와 값을 표시
      return (
        <div className="mt-4">
          {Object.entries(value).map(([key, val]) => (
            <p key={key}><strong>{key}:</strong> {val !== null ? val.toString() : 'N/A'}</p>
          ))}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }

    return value || 'N/A'; // 기본 값이 없는 경우 'N/A'로 표시
  };

  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Button onClick={handleCheck} disabled={loading}>
        {loading ? 'Loading...' : buttonText}
      </Button>
      {loading && <Loading />}
      {responseData && (
        <div className="mt-4">
          {responseData.summary ? (
            <div className="mb-4">
              <p>
                <strong>관련된 태그 개수:</strong> {responseData.summary.total_elements}
              </p>
              <p>
                <strong>정상 태그 개수:</strong> {responseData.summary.compliant_count}
              </p>
              <p>
                <strong>준수 비율 (퍼센트 또는 갯수):</strong> {responseData.summary.compliant_percentage}
              </p>
            </div>
          ) : null}
          {Array.isArray(responseData.data) && responseData.data.length > 0 ? (
            <table className="min-w-full bg-white mt-4">
              <thead>
                <tr>
                  {Object.keys(responseData.data[0]).map((key) => (
                    <th key={key} className="py-2 px-4 border-b">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responseData.data.map((item, index) => (
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

export default function CardContainer({ valueUrl }) {
  // URL을 받아 각 API 엔드포인트 구성
  const videoCaptionUrl = `https://tgrs.api-jowonjae.kro.kr/video_caption?url=${valueUrl}`;
  const contrastUrl = `https://tgrs.api-jowonjae.kro.kr/contrast?url=${valueUrl}`;
  const keyboardUrl = `https://tgrs.api-jowonjae.kro.kr/keyboard?url=${valueUrl}`;
  const focusUrl = `https://tgrs.api-jowonjae.kro.kr/focus?url=${valueUrl}`;
  const tableStructureUrl = `https://tgrs.api-jowonjae.kro.kr/table_structure?url=${valueUrl}`;
  const labelUrl = `https://tgrs.api-jowonjae.kro.kr/label?url=${valueUrl}`;
  const altTextUrl = `https://tgrs.api-jowonjae.kro.kr/check_ai?url=${valueUrl}`;
  const linkAccessibilityUrl = `https://tgrs.api-jowonjae.kro.kr/link_accessibility?url=${valueUrl}`; // 링크 접근성 검사 추가

  return (
    <div>
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
      <CheckCard
        title="링크 접근성 검사 (Link Accessibility Check) - (AI 기반 검사 추가 예정)" // 링크 접근성 검사 카드 추가
        apiUrl={linkAccessibilityUrl}
        buttonText="링크 접근성 검사 시작"
      />
    </div>
  );
}