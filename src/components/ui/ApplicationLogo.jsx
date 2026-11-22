export default function ApplicationLogo({ as: Logo = 'span', application, className, suffixClassName, ...props }) {
  const { initials, suffix, tone } = application

  return (
    <Logo
      {...props}
      className={`flex shrink-0 flex-col items-center justify-center border border-white/20 text-center font-[Georgia] font-bold leading-none ${tone} ${className}`}
    >
      <span>{initials}</span>
      <span className={`tracking-wider ${suffixClassName}`}>{suffix}</span>
    </Logo>
  )
}
