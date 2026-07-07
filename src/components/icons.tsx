import type { SVGProps } from "react";

export function ServiceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="currentColor" aria-hidden {...props}>
      <path d="M20.5,17A3.5,3.5,0,1,0,24,20.5,3.5042,3.5042,0,0,0,20.5,17Zm0,6A2.5,2.5,0,1,1,23,20.5,2.5026,2.5026,0,0,1,20.5,23Z" />
      <path d="M20,8A12,12,0,1,0,32,20,12.0137,12.0137,0,0,0,20,8Zm0,23A11,11,0,1,1,31,20,11.0125,11.0125,0,0,1,20,31Z" />
      <path d="M20,0A20,20,0,1,0,40,20,20.023,20.023,0,0,0,20,0Zm0,39A19,19,0,1,1,39,20,19.0216,19.0216,0,0,1,20,39Z" />
    </svg>
  );
}

export function CaretDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden {...props}>
      <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden {...props}>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}
