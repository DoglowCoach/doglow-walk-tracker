import React, { useState } from 'react';

function WalkTracker() {
  const [stayCalmCount, setStayCalmCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [routePoints, setRoutePoints] = useState([{ x: 50, y: 220 }]);

  const handleStartWalk = () => {
    setIsTracking(true);
    setRoutePoints([{ x: 50, y: 220 }]);
  };

  const handleIncrease = () => {
    setStayCalmCount(count => count + 1);
  };

  const handleDecrease = () => {
    setStayCalmCount(count => (count > 0 ? count - 1 : 0));
  };

  // 간단한 데모용 경로 생성 로직(실제 앱에서는 GPS 좌표로 교체)
  React.useEffect(() => {
    if (!isTracking) {
      return;
    }

    const intervalId = setInterval(() => {
      setRoutePoints(prev => {
        const lastPoint = prev[prev.length - 1];
        const nextX = Math.min(350, lastPoint.x + 8);
        const randomYShift = Math.floor(Math.random() * 21) - 10;
        const nextY = Math.max(30, Math.min(220, lastPoint.y + randomYShift));
        return [...prev, { x: nextX, y: nextY }];
      });
    }, 800);

    return () => clearInterval(intervalId);
  }, [isTracking]);

  if (isTracking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#eef2f7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 16px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '390px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <h2 style={{ margin: 0, color: '#2d2d2d' }}>산책 경로 기록중</h2>
          <button
            onClick={() => setIsTracking(false)}
            style={{
              background: '#ff8600',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            종료
          </button>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '390px',
            height: '620px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            background: '#dce6f5',
            position: 'relative',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 390 620" style={{ display: 'block' }}>
            <rect x="0" y="0" width="390" height="620" fill="#dce6f5" />
            <rect x="20" y="30" width="350" height="560" rx="28" fill="#eaf0fa" />
            <path d="M40 120 H350" stroke="#c3d1ea" strokeWidth="2" />
            <path d="M40 250 H350" stroke="#c3d1ea" strokeWidth="2" />
            <path d="M40 380 H350" stroke="#c3d1ea" strokeWidth="2" />
            <path d="M120 50 V570" stroke="#c3d1ea" strokeWidth="2" />
            <path d="M260 50 V570" stroke="#c3d1ea" strokeWidth="2" />

            <polyline
              fill="none"
              stroke="#ff6b00"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={routePoints.map(point => `${point.x},${point.y}`).join(' ')}
            />

            {routePoints.length > 0 && (
              <circle
                cx={routePoints[routePoints.length - 1].x}
                cy={routePoints[routePoints.length - 1].y}
                r="8"
                fill="#ff8600"
              />
            )}
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f5ee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: '#2d2d2d', marginBottom: '2rem' }}>반려견 산책 트래커</h1>
      <button
        onClick={handleStartWalk}
        style={{
          background: '#ff8600',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          padding: '20px 50px',
          fontSize: '1.4rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '2.5rem',
        }}
      >
        산책 시작
      </button>
      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          padding: '2rem 2.5rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '290px',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '1.15rem', marginBottom: '1rem', color: '#525252' }}>
          차분하게 걷기(Stay Calm) 성공 횟수
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={handleDecrease}
            style={{
              background: '#eee',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              fontSize: '1.5rem',
              color: '#ff8600',
              cursor: 'pointer',
            }}
          >
            -
          </button>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '42px', textAlign: 'center' }}>
            {stayCalmCount}
          </span>
          <button
            onClick={handleIncrease}
            style={{
              background: '#eee',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              fontSize: '1.5rem',
              color: '#ff8600',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalkTracker;