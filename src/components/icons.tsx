import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function PhoneIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.3l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
    </svg>
  );
}

export function QuoteIcon({ size = 48, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h7.17v-6.83H5.17A3.17 3.17 0 0 1 8.34 8H9V6H7.17zm9.66 0A5.17 5.17 0 0 0 11.66 11.17V18H18.83v-6.83h-4A3.17 3.17 0 0 1 18 8h.83V6h-1.99z" />
    </svg>
  );
}

export function WaveBottom({ fill = "#F3F6EE" }: { fill?: string }) {
  return (
    <div className="wave-divider bottom" aria-hidden>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M421.9,6.7c-55.7-4.2-117.8,0.5-178.1,14.4C183.2,39.2,78.7,64.5,0,64.5v35.5h1000V64.5
          c-93.5,0-230.7-41.9-355.3-51.3C570.3,6.5,486.6,11.9,421.9,6.7z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function WaveTop({ fill = "#83AC861F" }: { fill?: string }) {
  return (
    <div className="wave-divider top" aria-hidden>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M421.9,6.7c-55.7-4.2-117.8,0.5-178.1,14.4C183.2,39.2,78.7,64.5,0,64.5V0h1000v64.5
          c-93.5,0-230.7-41.9-355.3-51.3C570.3,6.5,486.6,11.9,421.9,6.7z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
