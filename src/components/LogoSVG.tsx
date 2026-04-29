export default function LogoSVG({ height = 52 }: { height?: number }) {
  // Tight viewBox around actual content — removes dead whitespace so the
  // logo renders larger relative to the container and stays crisp.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="28 16 730 252"
      height={height}
      style={{ display: 'block', width: 'auto' }}
      aria-label="ClearMed Imaging Solutions"
      role="img"
    >
      {/* Row 1 */}
      <circle cx="95"  cy="38"  r="5"  fill="#4A90C4"/>
      <circle cx="115" cy="38"  r="6"  fill="#2968A3"/>
      <circle cx="137" cy="38"  r="5"  fill="#4A90C4"/>
      <circle cx="157" cy="38"  r="4"  fill="#2968A3"/>

      {/* Row 2 */}
      <circle cx="75"  cy="58"  r="5"  fill="#2968A3"/>
      <circle cx="95"  cy="58"  r="8"  fill="#1B3D6F"/>
      <circle cx="115" cy="58"  r="9"  fill="#2968A3"/>
      <circle cx="137" cy="58"  r="7"  fill="#1B3D6F"/>
      <circle cx="157" cy="58"  r="5"  fill="#4A90C4"/>
      <circle cx="175" cy="58"  r="4"  fill="#2968A3"/>

      {/* Row 3 */}
      <circle cx="55"  cy="80"  r="5"  fill="#4A90C4"/>
      <circle cx="75"  cy="80"  r="8"  fill="#2968A3"/>
      <circle cx="95"  cy="80"  r="11" fill="#1B3D6F"/>
      <circle cx="115" cy="80"  r="12" fill="#1B3D6F"/>
      <circle cx="137" cy="80"  r="10" fill="#2968A3"/>
      <circle cx="157" cy="80"  r="7"  fill="#1B3D6F"/>
      <circle cx="175" cy="80"  r="5"  fill="#4A90C4"/>

      {/* Row 4 */}
      <circle cx="38"  cy="103" r="4"  fill="#4A90C4"/>
      <circle cx="55"  cy="103" r="7"  fill="#2968A3"/>
      <circle cx="75"  cy="103" r="10" fill="#1B3D6F"/>
      <circle cx="95"  cy="103" r="13" fill="#1B3D6F"/>
      <circle cx="115" cy="103" r="14" fill="#1B3D6F"/>
      <circle cx="137" cy="103" r="12" fill="#2968A3"/>
      <circle cx="157" cy="103" r="9"  fill="#1B3D6F"/>
      <circle cx="175" cy="103" r="6"  fill="#2968A3"/>
      <circle cx="192" cy="103" r="4"  fill="#4A90C4"/>

      {/* Row 5 */}
      <circle cx="38"  cy="128" r="5"  fill="#2968A3"/>
      <circle cx="55"  cy="128" r="8"  fill="#1B3D6F"/>
      <circle cx="75"  cy="128" r="11" fill="#1B3D6F"/>
      <circle cx="95"  cy="128" r="14" fill="#1B3D6F"/>
      <circle cx="115" cy="128" r="15" fill="#1B3D6F"/>
      <circle cx="137" cy="128" r="13" fill="#1B3D6F"/>
      <circle cx="157" cy="128" r="10" fill="#2968A3"/>
      <circle cx="175" cy="128" r="7"  fill="#1B3D6F"/>
      <circle cx="192" cy="128" r="5"  fill="#2968A3"/>

      {/* Row 6 */}
      <circle cx="38"  cy="153" r="4"  fill="#4A90C4"/>
      <circle cx="55"  cy="153" r="7"  fill="#2968A3"/>
      <circle cx="75"  cy="153" r="10" fill="#1B3D6F"/>
      <circle cx="95"  cy="153" r="13" fill="#1B3D6F"/>
      <circle cx="115" cy="153" r="14" fill="#1B3D6F"/>
      <circle cx="137" cy="153" r="12" fill="#2968A3"/>
      <circle cx="157" cy="153" r="9"  fill="#1B3D6F"/>
      <circle cx="175" cy="153" r="6"  fill="#2968A3"/>
      <circle cx="192" cy="153" r="4"  fill="#4A90C4"/>

      {/* Row 7 */}
      <circle cx="55"  cy="178" r="5"  fill="#4A90C4"/>
      <circle cx="75"  cy="178" r="8"  fill="#2968A3"/>
      <circle cx="95"  cy="178" r="11" fill="#1B3D6F"/>
      <circle cx="115" cy="178" r="12" fill="#1B3D6F"/>
      <circle cx="137" cy="178" r="10" fill="#2968A3"/>
      <circle cx="157" cy="178" r="7"  fill="#1B3D6F"/>
      <circle cx="175" cy="178" r="5"  fill="#4A90C4"/>

      {/* Row 8 */}
      <circle cx="75"  cy="200" r="5"  fill="#2968A3"/>
      <circle cx="95"  cy="200" r="8"  fill="#1B3D6F"/>
      <circle cx="115" cy="200" r="9"  fill="#2968A3"/>
      <circle cx="137" cy="200" r="7"  fill="#1B3D6F"/>
      <circle cx="157" cy="200" r="5"  fill="#4A90C4"/>
      <circle cx="175" cy="200" r="4"  fill="#2968A3"/>

      {/* Row 9 */}
      <circle cx="95"  cy="220" r="5"  fill="#4A90C4"/>
      <circle cx="115" cy="220" r="6"  fill="#2968A3"/>
      <circle cx="137" cy="220" r="5"  fill="#4A90C4"/>
      <circle cx="157" cy="220" r="4"  fill="#2968A3"/>

      {/* Separator */}
      <rect x="228" y="20" width="3" height="240" fill="#00AADD" rx="1.5"/>

      {/* ClearMed — Montserrat loaded by the page */}
      <text
        x="265" y="148"
        fontFamily="'Montserrat', 'Segoe UI', Arial, sans-serif"
        fontSize="82"
        fontWeight="600"
        letterSpacing="1"
      >
        <tspan fill="#1B3D6F">Clear</tspan><tspan fill="#00AADD">Med</tspan>
      </text>

      {/* IMAGING SOLUTIONS */}
      <text
        x="268" y="192"
        fontFamily="'Montserrat', 'Segoe UI', Arial, sans-serif"
        fontSize="30"
        fontWeight="300"
        fill="#6B7B8D"
        letterSpacing="8"
      >
        IMAGING SOLUTIONS
      </text>
    </svg>
  )
}
