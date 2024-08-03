export const ButtonIcon = () => {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_39_424)">
        <rect
          x="-1"
          y="1"
          width="54"
          height="54"
          rx="27"
          transform="matrix(-1 0 0 1 56 1)"
          stroke="url(#paint0_linear_39_424)"
          strokeWidth="2"
        />
        <path
          d="M27 35L33 29L27 23"
          stroke="#00FFA3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_39_424"
          x="0"
          y="0"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_39_424" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_39_424"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_39_424"
          x1="17.92"
          y1="-1.66033e-06"
          x2="49.4916"
          y2="52.8481"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0CF69D" />
          <stop offset="1" stopColor="#A962FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
