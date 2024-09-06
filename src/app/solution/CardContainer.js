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

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    return value;
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
                <strong>Accessible Count:</strong> {responseData.summary.accessible_count}
              </p>
              <p>
                <strong>Accessible Percentage:</strong> {responseData.summary.accessible_percentage}%
              </p>
              <p>
                <strong>Total Elements:</strong> {responseData.summary.total_elements}
              </p>
            </div>
          ) : null}
          {Array.isArray(responseData.results) && responseData.results.length > 0 ? (
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

export default function CardContainer({ valueUrl }) {
  // URL을 받아 각 API 엔드포인트 구성
  const videoCaptionUrl = `oci.jowonjae.kro.kr/video_caption?url=${valueUrl}`;
  const contrastUrl = `oci.jowonjae.kro.kr/contrast?url=${valueUrl}`;
  const keyboardUrl = `oci.jowonjae.kro.kr/keyboard?url=${valueUrl}`;
  const focusUrl = `oci.jowonjae.kro.kr/focus?url=${valueUrl}`;
  const tableStructureUrl = `oci.jowonjae.kro.kr/table_structure?url=${valueUrl}`;
  const labelUrl = `oci.jowonjae.kro.kr/label?url=${valueUrl}`;
  const altTextUrl = `oci.jowonjae.kro.kr/alt_text?url=${valueUrl}`;

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
    </div>
  );
}