export default function CardAccent({ type }) {
  if (type === 'space') {
    return (
      <div className="accent accent-space" aria-hidden="true">
        <div className="planet" />
        <div className="orbit">
          <div className="satellite" />
        </div>
        <style jsx>{`
          .accent-space {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 52px;
            height: 52px;
            opacity: 0.7;
            pointer-events: none;
          }
          .planet {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            margin: -5px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #6da7ec, #184f95);
          }
          .orbit {
            position: absolute;
            inset: 0;
            border: 1px solid rgba(131, 197, 160, 0.28);
            border-radius: 50%;
            animation: spin 7s linear infinite;
          }
          .satellite {
            position: absolute;
            top: -3px;
            left: 50%;
            width: 6px;
            height: 6px;
            margin-left: -3px;
            border-radius: 50%;
            background: #83c5a0;
            box-shadow: 0 0 6px rgba(131, 197, 160, 0.8);
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .orbit { animation: none; }
          }
        `}</style>
      </div>
    )
  }

  if (type === 'finance') {
    return (
      <svg
        className="accent accent-finance"
        viewBox="0 0 60 40"
        aria-hidden="true"
      >
        <polyline points="2,32 14,24 24,28 36,14 48,18 58,6" className="spark-line" />
        <circle cx="58" cy="6" r="2.6" className="spark-dot" />
        <style jsx>{`
          .accent-finance {
            position: absolute;
            top: 16px;
            right: 14px;
            width: 58px;
            height: 38px;
            opacity: 0.75;
            pointer-events: none;
          }
          .spark-line {
            fill: none;
            stroke: #83c5a0;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 5 4;
            animation: flow 2.4s linear infinite;
          }
          .spark-dot {
            fill: #83c5a0;
            transform-box: fill-box;
            transform-origin: center;
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes flow {
            from { stroke-dashoffset: 18; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.55; }
          }
          @media (prefers-reduced-motion: reduce) {
            .spark-line, .spark-dot { animation: none; }
          }
        `}</style>
      </svg>
    )
  }

  if (type === 'customer-experience') {
    return (
      <svg
        className="accent accent-cx"
        viewBox="0 0 60 50"
        aria-hidden="true"
      >
        <line x1="10" y1="40" x2="30" y2="12" className="cx-line" />
        <line x1="30" y1="12" x2="50" y2="34" className="cx-line" style={{ animationDelay: '0.4s' }} />
        <line x1="10" y1="40" x2="50" y2="34" className="cx-line" style={{ animationDelay: '0.8s' }} />
        <circle cx="10" cy="40" r="3.2" className="cx-dot" />
        <circle cx="30" cy="12" r="3.2" className="cx-dot" style={{ animationDelay: '0.5s' }} />
        <circle cx="50" cy="34" r="3.2" className="cx-dot" style={{ animationDelay: '1s' }} />
        <style jsx>{`
          .accent-cx {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 58px;
            height: 48px;
            opacity: 0.75;
            pointer-events: none;
          }
          .cx-line {
            stroke: #83c5a0;
            stroke-width: 1;
            opacity: 0.2;
            animation: linepulse 3s ease-in-out infinite;
          }
          .cx-dot {
            fill: #83c5a0;
            transform-box: fill-box;
            transform-origin: center;
            animation: dotpulse 3s ease-in-out infinite;
          }
          @keyframes dotpulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes linepulse {
            0%, 100% { opacity: 0.12; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .cx-line, .cx-dot { animation: none; }
          }
        `}</style>
      </svg>
    )
  }

  return null
}
