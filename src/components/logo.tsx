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
      <circle cx="12" cy="12" r="8" fill="var(--color-disc-d)" opacity="0.7" />
      <circle cx="20" cy="12" r="8" fill="var(--color-disc-i)" opacity="0.7" />
      <circle cx="20" cy="20" r="8" fill="var(--color-disc-s)" opacity="0.7" />
      <circle cx="12" cy="20" r="8" fill="var(--color-disc-c)" opacity="0.7" />
    </svg>
  );
}
