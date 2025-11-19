import React from "react";
import { useTheme } from "../Context/ThemeContext";
import "./Logo.css";

const Logo = () => {
  const { theme } = useTheme(); // dynamic theme

  const refreshApp = () => {
    window.location.reload();   // 🔥 Full application reload
  };

  return (
    <div className="logo-container" onClick={refreshApp}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 84"
        className="logo-icon"
      >
        {/* Head */}
        <circle cx="36" cy="30" r="24" fill={theme.textColor} />

        {/* Headband */}
        <rect x="18" y="24" width="36" height="12" rx="6" fill={theme.typeBoxText} />

        {/* Eyes */}
        <circle cx="26" cy="30" r="3" fill={theme.background} />
        <circle cx="46" cy="30" r="3" fill={theme.background} />

        {/* Side ties */}
        <path d="M56 20l8-4-6 9" fill={theme.textColor} />
        <path d="M16 20l-8-4 6 9" fill={theme.textColor} />

        {/* Chest */}
        <path
          d="M12 70c0-13.25 10.75-24 24-24s24 10.75 24 24v4c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4v-4z"
          fill={theme.textColor}
        />

        {/* Lines */}
        <path
          d="M14 60c5 6 13 10 22 10s17-4 22-10"
          fill="none"
          stroke={theme.typeBoxText}
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M10 62c6-4 16-8 26-8s20 4 26 8"
          fill="none"
          stroke={theme.typeBoxText}
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M8 68c8-6 18-9 28-9s20 3 28 9"
          fill="none"
          stroke={theme.typeBoxText}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Theme-based TypoNinja text color */}
      <span className="logo-text" style={{ color: theme.textColor }}>
        TypoNinja
      </span>
    </div>
  );
};

export default Logo;
