interface LogoProps {
  size?: number;
}

/**
 * ClearTalk DISC motif logo.
 * Four circles representing the four communication styles.
 */
export function Logo({ size = 32 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      class="logo"
    >
      <circle cx="10" cy="10" r="7" fill="var(--color-disc-d)" opacity="0.85" />
      <circle cx="22" cy="10" r="7" fill="var(--color-disc-i)" opacity="0.85" />
      <circle cx="22" cy="22" r="7" fill="var(--color-disc-s)" opacity="0.85" />
      <circle cx="10" cy="22" r="7" fill="var(--color-disc-c)" opacity="0.85" />
    </svg>
  );
}
