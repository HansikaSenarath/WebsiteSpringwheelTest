import React, { useState } from "react";
import { Settings } from "lucide-react";
import { spinWheelData } from "./spinWheelData";

const SpinWheel = ({ selectedId, onSelect }) => {
  const [localSelectedId, setLocalSelectedId] = useState(selectedId || 1);
  const [hoveredId, setHoveredId] = useState(null);

  const size = 420;
  const radius = size / 2;
  const innerRadius = 0;
  const angle = 360 / spinWheelData.length;
  const pullDistance = 15;

  const blueShades = [
    "#90e0ef",
    "#90e0ef",
    "#00b4d8",
    "#00b4d8",
    "#00b4d8",
    "#0177b6",
    "#0177b6",
    "#0177b6",
  ];

  const polar = (r, deg, offset = 0) => {
    const rad = (deg - 90) * (Math.PI / 180);
    const effectiveRadius = r + offset;
    return {
      x: radius + effectiveRadius * Math.cos(rad),
      y: radius + effectiveRadius * Math.sin(rad),
    };
  };

  const buildPath = (start, end, isPulled = false) => {
    const outerRadius = radius + (isPulled ? pullDistance : 0);

    const centerPoint = { x: radius, y: radius };
    const p1 = polar(outerRadius, end, 0);
    const p2 = polar(outerRadius, start, 0);
    const largeArc = end - start <= 180 ? 0 : 1;

    return `
      M ${centerPoint.x} ${centerPoint.y}
      L ${p2.x} ${p2.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${p1.x} ${p1.y}
      Z
    `;
  };

  const getLabelPosition = (deg) => {
    const labelRadius = radius + 80;
    return polar(labelRadius, deg);
  };

  const getLineEndPosition = (deg, isPulled = false) => {
    const lineRadius = radius + 20 + (isPulled ? pullDistance : 0);
    return polar(lineRadius, deg);
  };

  return (
    <div className="flex gap-0 items-start w-full overflow-visible">
      <div className="w-5/7 overflow-visible flex justify-center py-2">
        <div className="relative overflow-visible">
          <svg
            width={size + 150}
            height={size + 170}
            className="select-none overflow-visible"
          >
            <defs>
              <filter id="embossEffect">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="3" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.4" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="innerShadow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feFlood floodColor="#ffffff" floodOpacity="0.5" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </radialGradient>

              <filter id="dropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                <feOffset dx="0" dy="4" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform="translate(175, 175)">
              {spinWheelData.map((section, i) => {
                const start = i * angle;
                const end = start + angle;
                const currentSelected = selectedId || localSelectedId;
                const isSelected = section.id === currentSelected;
                const isHovered = section.id === hoveredId;
                const isEmbossed = isHovered || isSelected;
                const color = blueShades[i % blueShades.length];
                const midAngle = start + angle / 2;

                const iconPos = polar(
                  radius - 60,
                  midAngle,
                  isEmbossed ? pullDistance : 0
                );
                const lineStart = getLineEndPosition(midAngle, isEmbossed);
                const labelPos = getLabelPosition(midAngle);

                return (
                  <g key={section.id}>
                    <path
                      d={buildPath(start, end, isEmbossed)}
                      fill={color}
                      opacity={isEmbossed ? 1 : 0.85}
                      filter={isEmbossed ? "url(#dropShadow)" : "none"}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredId(section.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => {
                        setLocalSelectedId(section.id);
                        if (onSelect) onSelect(section);
                      }}
                    />

                    {isEmbossed && (
                      <>
                        <path
                          d={buildPath(start, end, isEmbossed)}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="4"
                          opacity="0.6"
                          filter="url(#innerShadow)"
                          className="pointer-events-none"
                        />
                        <path
                          d={buildPath(start, end, isEmbossed)}
                          fill="rgba(255,255,255,0.1)"
                          stroke="none"
                          className="pointer-events-none"
                        />
                      </>
                    )}

                    <line
                      x1={radius}
                      y1={radius}
                      x2={iconPos.x}
                      y2={iconPos.y}
                      stroke="#D97706"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      opacity="0.5"
                      className="pointer-events-none transition-all duration-300"
                    />

                    <circle
                      cx={iconPos.x}
                      cy={iconPos.y}
                      r="20"
                      fill="white"
                      opacity="0.95"
                      className="pointer-events-none transition-all duration-300"
                    />

                    <g
                      transform={`translate(${iconPos.x - 12}, ${
                        iconPos.y - 12
                      })`}
                      className="pointer-events-none transition-all duration-300"
                    >
                      <Settings size={24} color={color} strokeWidth={2.5} />
                    </g>

                    <circle
                      cx={iconPos.x}
                      cy={iconPos.y}
                      r="10"
                      fill={color}
                      opacity="0.9"
                      className="pointer-events-none transition-all duration-300"
                    />
                    <text
                      x={iconPos.x}
                      y={iconPos.y + 4}
                      textAnchor="middle"
                      className="font-bold text-xs pointer-events-none transition-all duration-300"
                      fill="white"
                    >
                      {section.id}
                    </text>

                    <line
                      x1={lineStart.x}
                      y1={lineStart.y}
                      x2={labelPos.x}
                      y2={labelPos.y}
                      stroke={isSelected ? color : "#999"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      className="pointer-events-none transition-all duration-300"
                    />

                    <text
                      x={labelPos.x}
                      y={labelPos.y + 5}
                      textAnchor="middle"
                      className="text-xs font-semibold cursor-pointer transition-all duration-300"
                      fill={isHovered || isSelected ? color : "#333"}
                      onMouseEnter={() => setHoveredId(section.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => {
                        setLocalSelectedId(section.id);
                        if (onSelect) onSelect(section);
                      }}
                    >
                      {section.displayTitle
                        ? section.displayTitle.map((line, idx) => (
                            <tspan
                              key={idx}
                              x={labelPos.x}
                              dy={idx === 0 ? 0 : "1.2em"}
                            >
                              {line}
                            </tspan>
                          ))
                        : section.title}
                    </text>
                  </g>
                );
              })}

              {(() => {
                const titleText = "Supernormal Leader";
                const titleRadius = radius + 5;
                const startAngle = -30;
                const angleSpan = 50;

                return (
                  <g>
                    <defs>
                      <path
                        id="titlePath"
                        d={`M ${polar(titleRadius, startAngle).x} ${
                          polar(titleRadius, startAngle).y
                        } A ${titleRadius} ${titleRadius} 0 0 1 ${
                          polar(titleRadius, startAngle + angleSpan).x
                        } ${polar(titleRadius, startAngle + angleSpan).y}`}
                      />
                    </defs>
                    {/* Curved Background */}
                    <path
                      d={`M ${polar(titleRadius, startAngle).x} ${
                        polar(titleRadius, startAngle).y
                      } A ${titleRadius} ${titleRadius} 0 0 1 ${
                        polar(titleRadius, startAngle + angleSpan).x
                      } ${polar(titleRadius, startAngle + angleSpan).y}`}
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="20"
                      strokeLinecap="square"
                      opacity="0.9"
                    />
                    <text
                      className="font-bold"
                      fontSize="16"
                      fill="white"
                      dominantBaseline="middle"
                    >
                      <textPath
                        href="#titlePath"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {titleText}
                      </textPath>
                    </text>
                  </g>
                );
              })()}

              <circle
                cx={radius}
                cy={radius}
                r={60}
                fill="url(#centerGradient)"
                stroke="#e0e0e0"
                strokeWidth="3"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => {
                  setLocalSelectedId(9);
                  if (onSelect) {
                    onSelect({
                      id: 9,
                      title: "Pre Requisites",
                      short: "Leader",
                      description:
                        "Before true mindfulness begins, every leader should recognize the Five Hindrances that already exist within — subtle forces that cloud clarity and weaken judgment:",
                      leadershipApplication: [
                        "Sensual Desire – craving for comfort, pleasure, or external satisfaction",
                        "Ill-Will – anger, irritation, or resistance toward challenges",
                        "Sloth and Torpor – mental fatigue, dullness, or lack of energy",
                        "Restlessness and Remorse – anxiety about the future and regret about the past",
                        "Cognitive Dissonance (Doubt) – inner conflict and uncertainty about oneself or the practice",
                        "Awareness of these inner barriers is the first step — transforming reaction into reflection, and reflection into mindful leadership.",
                      ],
                      hideLeadershipHeader: true,
                      hideId: true,
                      showAsParagraph: true,
                    });
                  }
                }}
              />

              <text
                x={radius}
                y={radius - 25}
                textAnchor="middle"
                className="font-bold"
                fontSize="18"
                fill="#D97706"
              >
                LEADER
              </text>

              <text
                x={radius}
                y={radius - 5}
                textAnchor="middle"
                className="text-xs"
                fontSize="11"
                fill="#666"
              >
                RR IW ST AA
              </text>

              <line
                x1={radius - 45}
                y1={radius + 5}
                x2={radius + 45}
                y2={radius + 5}
                stroke="#D97706"
                strokeWidth="2"
              />

              <text
                x={radius}
                y={radius + 25}
                textAnchor="middle"
                className="text-xs"
                fontSize="11"
                fill="#666"
              >
                Pre Requisites
              </text>
            </g>
          </svg>
        </div>
      </div>
      <div className="w-1/4 py-2 px-3"></div>
    </div>
  );
};

export default SpinWheel;
