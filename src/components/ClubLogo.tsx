import React from 'react';
import { useClub } from '../context/ClubContext';

interface ClubLogoProps {
  variant?: 'emblem' | 'full' | 'horizontal' | 'banner';
  theme?: 'blue-bg' | 'white-bg' | 'transparent-white' | 'transparent-blue' | 'royal-blue';
  className?: string;
  size?: number | string;
  showRegNo?: boolean;
  logoUrl?: string;
}

/**
 * Official Logo Component for ZEALOUS BROTHERS (സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി)
 * Reg No: 126/95, 429/96 | Estd: 1994
 * Renders user-uploaded official logo directly without re-editing,
 * or authentic vector insignia matching the official banner.
 */
export const ClubLogo: React.FC<ClubLogoProps> = ({
  variant = 'emblem',
  theme = 'blue-bg',
  className = '',
  size = 56,
  showRegNo = true,
  logoUrl,
}) => {
  // Check for uploaded custom logo from context or prop, defaulting to authentic official emblem
  let activeCustomLogo: string | null = logoUrl || null;
  try {
    const club = useClub();
    if (!activeCustomLogo && club?.customLogoUrl) {
      activeCustomLogo = club.customLogoUrl;
    }
  } catch {
    // Rendered outside provider, use prop or fallback
  }

  // Default to the exact authentic uploaded logo image
  if (!activeCustomLogo) {
    activeCustomLogo = '/zb-official-logo.png';
  }

  // Color configuration based on theme
  const isBlueBg = theme === 'blue-bg' || theme === 'royal-blue';
  const isWhiteBg = theme === 'white-bg';
  const isTransparentWhite = theme === 'transparent-white';

  const primaryColor = isBlueBg || isTransparentWhite ? '#FFFFFF' : '#0072CE';
  const bgColor = isBlueBg ? '#0072CE' : isWhiteBg ? '#FFFFFF' : 'transparent';

  // 1. If an authentic logo has been uploaded or defaulted, render it directly as-is
  if (activeCustomLogo) {
    if (variant === 'emblem') {
      return (
        <div
          className={`inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${
            isTransparentWhite || theme === 'transparent-blue' ? 'bg-transparent' : 'bg-white shadow-xs'
          } ${
            isBlueBg ? 'ring-2 ring-white/30 shadow-sky-950/20' : theme === 'transparent-blue' ? '' : 'ring-1 ring-slate-100'
          } ${className}`}
          style={{ width: size, height: size }}
          title="സെലസ് ബ്രദേഴ്സ് ഔദ്യോഗിക ലോഗോ"
        >
          <img
            src={activeCustomLogo}
            alt="Zealous Brothers Official Logo"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    if (variant === 'horizontal') {
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <div
            className={`shrink-0 rounded-full overflow-hidden flex items-center justify-center ${
              isTransparentWhite || theme === 'transparent-blue' ? 'bg-transparent' : 'bg-white'
            } ${
              isBlueBg ? 'ring-2 ring-white/20' : 'ring-1 ring-slate-200'
            }`}
            style={{ width: size, height: size }}
          >
            <img
              src={activeCustomLogo}
              alt="Zealous Brothers Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center select-none leading-tight">
            <span
              className={`font-black tracking-tight ${
                isBlueBg || isTransparentWhite ? 'text-white' : 'text-[#0072ce]'
              }`}
              style={{ fontSize: typeof size === 'number' ? `${Math.max(17, size * 0.38)}px` : '1.25rem' }}
            >
              സെലസ് ബ്രദേഴ്സ്
            </span>
            <span
              className={`text-[12px] font-bold ${
                isBlueBg || isTransparentWhite ? 'text-sky-100' : 'text-slate-800'
              }`}
            >
              കലാ സാംസ്കാരിക വേദി, പുതുപൊന്നാനി
            </span>
            {showRegNo && (
              <span
                className={`text-[10px] font-medium tracking-tight ${
                  isBlueBg || isTransparentWhite ? 'text-sky-200' : 'text-slate-500'
                }`}
              >
                Estd: 1994 | Govt. Reg. No. 126/95 | Aff. NYK. No. 429/96
              </span>
            )}
          </div>
        </div>
      );
    }

    // Full or Banner Variant with Uploaded Logo
    return (
      <div
        className={`flex flex-col items-center select-none overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200 ${className}`}
        style={{ width: typeof size === 'number' ? `${size}px` : size }}
      >
        <div className="w-full bg-white p-3 flex items-center justify-center">
          <img
            src={activeCustomLogo}
            alt="സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി"
            className="w-full h-auto max-h-[260px] object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
        {showRegNo && (
          <div className="w-full bg-[#707070] text-white px-4 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider">
            <span>Estd: 1994</span>
            <span>Govt. Reg. No. 126/95</span>
            <span>Aff. NYK. No. 429/96</span>
          </div>
        )}
      </div>
    );
  }

  // 2. Circular Emblem SVG (Official Seal with Torch, Wings, Football, Pen, "KALA SAMSKARIKA VEDI PUTHUPONNANI")
  const renderEmblem = (width: number | string = '100%', height: number | string = '100%') => (
    <svg
      viewBox="0 0 500 500"
      width={width}
      height={height}
      className="select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="സെലസ് ബ്രദേഴ്സ് ഔദ്യോഗിക മുദ്ര"
    >
      <defs>
        {/* Curved text path for top text: KALA SAMSKARIKA VEDI */}
        <path
          id="topCurve"
          d="M 68 250 A 182 182 0 0 1 432 250"
          fill="none"
        />
        {/* Curved text path for bottom text: PUTHUPONNANI */}
        <path
          id="bottomCurve"
          d="M 425 250 A 175 175 0 0 1 75 250"
          fill="none"
        />
      </defs>

      {/* Outer concentric decorative rings */}
      <circle cx="250" cy="250" r="236" stroke={primaryColor} strokeWidth="6" />
      <circle cx="250" cy="250" r="226" stroke={primaryColor} strokeWidth="2.5" />
      <circle cx="250" cy="250" r="154" stroke={primaryColor} strokeWidth="3" />
      <circle cx="250" cy="250" r="147" stroke={primaryColor} strokeWidth="1.5" />

      {/* Star/Dot dividers between upper and lower text */}
      <circle cx="70" cy="250" r="4.5" fill={primaryColor} />
      <circle cx="430" cy="250" r="4.5" fill={primaryColor} />

      {/* Top Arc Text: KALA SAMSKARIKA VEDI */}
      <text
        fill={primaryColor}
        fontSize="24"
        fontWeight="800"
        letterSpacing="4.2"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
      >
        <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
          KALA SAMSKARIKA VEDI
        </textPath>
      </text>

      {/* Bottom Arc Text: PUTHUPONNANI */}
      <text
        fill={primaryColor}
        fontSize="23"
        fontWeight="800"
        letterSpacing="4.5"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
      >
        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
          PUTHUPONNANI
        </textPath>
      </text>

      {/* ================= INNER CREST ================= */}

      {/* Left Wing (Upward Curved Feathered Layers) */}
      <g fill={primaryColor}>
        <path d="M 215 150 C 190 120, 160 140, 150 160 C 145 170, 140 190, 155 210 C 160 216, 175 224, 195 230 C 180 215, 170 195, 175 180 C 180 165, 195 155, 215 150 Z" />
        <path d="M 185 175 C 165 150, 140 170, 135 190 C 130 205, 135 225, 155 242 C 165 250, 180 256, 200 258 C 180 245, 165 225, 170 205 C 174 190, 180 180, 185 175 Z" opacity="0.95" />
        <path d="M 160 205 C 145 185, 125 200, 122 220 C 120 235, 125 255, 145 272 C 160 282, 180 287, 205 288 C 180 275, 160 252, 162 232 C 164 220, 160 210, 160 205 Z" opacity="0.9" />
        <path d="M 145 238 C 130 220, 115 235, 115 250 C 115 265, 122 285, 140 300 C 155 310, 178 316, 205 318 C 178 305, 155 285, 152 265 C 150 250, 148 242, 145 238 Z" opacity="0.85" />
        <path d="M 215 220 C 190 220, 165 235, 150 255 C 170 255, 195 245, 215 230 Z" />
        <path d="M 215 250 C 190 255, 170 270, 158 290 C 178 285, 200 275, 215 260 Z" />
      </g>

      {/* Right Wing (Upward Curved Feathered Layers) */}
      <g fill={primaryColor}>
        <path d="M 285 150 C 310 120, 340 140, 350 160 C 355 170, 360 190, 345 210 C 340 216, 325 224, 305 230 C 320 215, 330 195, 325 180 C 320 165, 305 155, 285 150 Z" />
        <path d="M 315 175 C 335 150, 360 170, 365 190 C 370 205, 365 225, 345 242 C 335 250, 320 256, 300 258 C 320 245, 335 225, 330 205 C 326 190, 320 180, 315 175 Z" opacity="0.95" />
        <path d="M 340 205 C 355 185, 375 200, 378 220 C 380 235, 375 255, 355 272 C 340 282, 320 287, 295 288 C 320 275, 340 252, 338 232 C 336 220, 340 210, 340 205 Z" opacity="0.9" />
        <path d="M 355 238 C 370 220, 385 235, 385 250 C 385 265, 378 285, 360 300 C 345 310, 322 316, 295 318 C 322 305, 345 285, 348 265 C 350 250, 352 242, 355 238 Z" opacity="0.85" />
        <path d="M 285 220 C 310 220, 335 235, 350 255 C 330 255, 305 245, 285 230 Z" />
        <path d="M 285 250 C 310 255, 330 270, 342 290 C 322 285, 300 275, 285 260 Z" />
      </g>

      {/* Central Football (Soccer Ball pattern sphere) */}
      <g stroke={primaryColor} strokeWidth="2.5" fill="none">
        <circle cx="250" cy="245" r="46" strokeWidth="3" />
        <polygon points="250,225 264,235 259,252 241,252 236,235" fill={primaryColor} />
        <line x1="250" y1="225" x2="250" y2="212" stroke={primaryColor} strokeWidth="2" />
        <line x1="264" y1="235" x2="276" y2="230" stroke={primaryColor} strokeWidth="2" />
        <line x1="259" y1="252" x2="268" y2="264" stroke={primaryColor} strokeWidth="2" />
        <line x1="241" y1="252" x2="232" y2="264" stroke={primaryColor} strokeWidth="2" />
        <line x1="236" y1="235" x2="224" y2="230" stroke={primaryColor} strokeWidth="2" />
      </g>

      {/* Central Upright Flaming Torch */}
      <g>
        <path
          d="M 250 82 C 242 105, 230 115, 238 135 C 242 142, 248 145, 250 152 C 252 145, 258 142, 262 135 C 270 115, 258 105, 250 82 Z"
          fill={primaryColor}
        />
        <path
          d="M 240 108 C 232 118, 226 130, 233 142 C 235 145, 240 148, 244 145 C 240 135, 242 122, 240 108 Z"
          fill={primaryColor}
        />
        <path
          d="M 260 108 C 268 118, 274 130, 267 142 C 265 145, 260 148, 256 145 C 260 135, 258 122, 260 108 Z"
          fill={primaryColor}
        />
        <path
          d="M 232 152 C 234 162, 242 168, 250 168 C 258 168, 266 162, 268 152 L 264 150 L 236 150 Z"
          fill={primaryColor}
        />
        <rect x="238" y="168" width="24" height="4" rx="1.5" fill={primaryColor} />
        <rect x="240" y="174" width="20" height="3" rx="1" fill={primaryColor} />
        <path d="M 246 177 L 246 325 L 254 325 L 254 177 Z" fill={primaryColor} />
      </g>

      {/* Ribbon with ZEALOUS BROTHERS */}
      <g>
        <path
          d="M 250 310 C 220 310, 175 295, 145 258 C 140 280, 160 315, 205 330 C 225 336, 242 338, 250 338 Z"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="3"
        />
        <path
          d="M 250 310 C 280 310, 325 295, 355 258 C 360 280, 340 315, 295 330 C 275 336, 258 338, 250 338 Z"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="3"
        />
        <path id="ribbonLeft" d="M 152 280 C 175 305, 210 322, 246 325" fill="none" />
        <text
          fill={primaryColor}
          fontSize="16"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        >
          <textPath href="#ribbonLeft" startOffset="30%" textAnchor="middle">
            ZEALOUS
          </textPath>
        </text>
        <path id="ribbonRight" d="M 254 325 C 290 322, 325 305, 348 280" fill="none" />
        <text
          fill={primaryColor}
          fontSize="16"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        >
          <textPath href="#ribbonRight" startOffset="70%" textAnchor="middle">
            BROTHERS
          </textPath>
        </text>
      </g>

      {/* Central Fountain Pen Nib */}
      <g>
        <path
          d="M 244 326 L 256 326 L 254 358 C 253 368, 251 376, 250 382 C 249 376, 247 368, 246 358 Z"
          fill={primaryColor}
        />
        <line x1="250" y1="334" x2="250" y2="378" stroke={bgColor} strokeWidth="1.5" />
        <circle cx="250" cy="350" r="2" fill={bgColor} />
      </g>

      {/* Registration Numbers Pedestal */}
      <g>
        <path
          d="M 205 348 L 244 348 L 244 366 L 215 366 L 205 357 Z"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="2"
        />
        <text
          x="225"
          y="360"
          fill={primaryColor}
          fontSize="11"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', monospace"
        >
          126/95
        </text>

        <path
          d="M 295 348 L 256 348 L 256 366 L 285 366 L 295 357 Z"
          fill={bgColor}
          stroke={primaryColor}
          strokeWidth="2"
        />
        <text
          x="275"
          y="360"
          fill={primaryColor}
          fontSize="11"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', monospace"
        >
          429/96
        </text>
      </g>
    </svg>
  );

  // If emblem only
  if (variant === 'emblem') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full shrink-0 ${
          isBlueBg ? 'bg-[#0072ce] shadow-md shadow-sky-900/30 ring-2 ring-white/30' : ''
        } ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full p-[4%] flex items-center justify-center">
          {renderEmblem()}
        </div>
      </div>
    );
  }

  // Horizontal variant (Emblem + Malayalam Typography + English)
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div
          className={`shrink-0 rounded-full flex items-center justify-center ${
            isBlueBg ? 'bg-[#0072ce] ring-2 ring-white/20' : ''
          }`}
          style={{ width: size, height: size }}
        >
          <div className="w-full h-full p-[4%]">
            {renderEmblem()}
          </div>
        </div>

        <div className="flex flex-col justify-center select-none leading-tight">
          <span
            className={`font-black tracking-tight ${
              isBlueBg || isTransparentWhite ? 'text-white' : 'text-[#0072ce]'
            }`}
            style={{ fontSize: typeof size === 'number' ? `${Math.max(17, size * 0.38)}px` : '1.25rem' }}
          >
            സെലസ് ബ്രദേഴ്സ്
          </span>

          <span
            className={`text-[12px] font-bold ${
              isBlueBg || isTransparentWhite ? 'text-sky-100' : 'text-slate-800'
            }`}
          >
            കലാ സാംസ്കാരിക വേദി, പുതുപൊന്നാനി
          </span>

          {showRegNo && (
            <span
              className={`text-[10px] font-medium tracking-tight ${
                isBlueBg || isTransparentWhite ? 'text-sky-200' : 'text-slate-500'
              }`}
            >
              Estd: 1994 | Govt. Reg. No. 126/95 | Aff. NYK. No. 429/96
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full Variant: Exact composition mirroring the official banner!
  // Top: Circular Seal
  // Center: "സെലസ് ബ്രദേഴ്സ്" in official blue
  // Subtitle: "കലാ സാംസ്കാരിക വേദി" & "പുതുപൊന്നാനി"
  // Bottom: Slate bar with Estd: 1994, Govt. Reg. No. 126/95, Aff. NYK. No. 429/96
  return (
    <div
      className={`flex flex-col items-center select-none overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200 ${className}`}
      style={{ width: typeof size === 'number' ? `${size}px` : size }}
    >
      <div className="w-full bg-white p-5 flex flex-col items-center">
        {/* 1. Circular Emblem */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 aspect-square flex items-center justify-center">
          {renderEmblem()}
        </div>

        {/* 2. Official Malayalam Typography "സെലസ് ബ്രദേഴ്സ്" */}
        <div className="w-full mt-3 text-center">
          <div
            className="font-black tracking-tight text-[#0072ce] leading-none"
            style={{
              fontSize: 'clamp(26px, 5.5vw, 38px)',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            സെലസ് ബ്രദേഴ്സ്
          </div>

          {/* Subtitles: കലാ സാംസ്കാരിക വേദി & പുതുപൊന്നാനി */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 px-3 sm:px-6 mt-1.5">
            <span>കലാ സാംസ്കാരിക വേദി</span>
            <span>പുതുപൊന്നാനി</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Gray Registration Bar */}
      {showRegNo && (
        <div className="w-full bg-[#707070] text-white px-4 py-1.5 flex items-center justify-between text-[10.5px] sm:text-[11.5px] font-mono tracking-wider">
          <span>Estd: 1994</span>
          <span>Govt. Reg. No. 126/95</span>
          <span>Aff. NYK. No. 429/96</span>
        </div>
      )}
    </div>
  );
};
