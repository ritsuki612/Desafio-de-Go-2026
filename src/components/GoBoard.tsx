'use client';

// 装飾用の9路盤SVGコンポーネント
interface GoBoardProps {
  className?: string;
  size?: number;
  showStones?: boolean;
}

// サンプルの石の配置（デモ用）
const DEMO_STONES: { x: number; y: number; color: 'black' | 'white' }[] = [
  { x: 2, y: 2, color: 'black' },
  { x: 6, y: 2, color: 'white' },
  { x: 3, y: 3, color: 'black' },
  { x: 5, y: 5, color: 'white' },
  { x: 6, y: 6, color: 'black' },
  { x: 4, y: 4, color: 'white' },
  { x: 2, y: 6, color: 'black' },
  { x: 7, y: 3, color: 'white' },
  { x: 1, y: 4, color: 'black' },
  { x: 7, y: 7, color: 'white' },
];

// 9路盤の星（スター）ポイント
const STAR_POINTS = [
  { x: 2, y: 2 },
  { x: 6, y: 2 },
  { x: 2, y: 6 },
  { x: 6, y: 6 },
  { x: 4, y: 4 },
];

export default function GoBoard({ className = '', size = 360, showStones = true }: GoBoardProps) {
  const padding = size * 0.08;
  const boardSize = size - padding * 2;
  const cellSize = boardSize / 8; // 9路盤は8マス分

  const getPos = (n: number) => padding + n * cellSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label="9x9 Go board"
    >
      {/* 碁盤の背景 */}
      <rect width={size} height={size} rx={8} fill="#C8A04A" />
      <rect
        x={padding * 0.5}
        y={padding * 0.5}
        width={size - padding}
        height={size - padding}
        rx={6}
        fill="#D4AD5C"
      />

      {/* 格子線 */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          {/* 横線 */}
          <line
            x1={getPos(0)}
            y1={getPos(i)}
            x2={getPos(8)}
            y2={getPos(i)}
            stroke="#5C3D11"
            strokeWidth={1}
            opacity={0.7}
          />
          {/* 縦線 */}
          <line
            x1={getPos(i)}
            y1={getPos(0)}
            x2={getPos(i)}
            y2={getPos(8)}
            stroke="#5C3D11"
            strokeWidth={1}
            opacity={0.7}
          />
        </g>
      ))}

      {/* 星（スター）ポイント */}
      {STAR_POINTS.map((p, i) => (
        <circle
          key={i}
          cx={getPos(p.x)}
          cy={getPos(p.y)}
          r={cellSize * 0.08}
          fill="#5C3D11"
          opacity={0.8}
        />
      ))}

      {/* 碁石 — style属性でCSSの上書きを防ぐ */}
      {showStones &&
        DEMO_STONES.map((stone, i) => (
          <g key={i}>
            {stone.color === 'black' ? (
              <>
                <circle
                  cx={getPos(stone.x)}
                  cy={getPos(stone.y)}
                  r={cellSize * 0.42}
                  style={{ fill: '#1a1a1a' }}
                />
                {/* ハイライト */}
                <ellipse
                  cx={getPos(stone.x) - cellSize * 0.1}
                  cy={getPos(stone.y) - cellSize * 0.12}
                  rx={cellSize * 0.14}
                  ry={cellSize * 0.1}
                  style={{ fill: 'rgba(255,255,255,0.25)' }}
                />
              </>
            ) : (
              <>
                <circle
                  cx={getPos(stone.x)}
                  cy={getPos(stone.y)}
                  r={cellSize * 0.42}
                  style={{ fill: '#e8e0d0', stroke: '#aaa', strokeWidth: 0.5 }}
                />
                {/* ハイライト */}
                <ellipse
                  cx={getPos(stone.x) - cellSize * 0.1}
                  cy={getPos(stone.y) - cellSize * 0.12}
                  rx={cellSize * 0.14}
                  ry={cellSize * 0.1}
                  style={{ fill: 'rgba(255,255,255,0.6)' }}
                />
              </>
            )}
          </g>
        ))}
    </svg>
  );
}
