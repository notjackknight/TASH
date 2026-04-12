// Type fix: hugeicons-react types each icon as
//   (props: Omit<HugeiconsIconProps, 'icon'>) => JSX.Element
// The Omit flattens the interface and drops inherited SVG attributes
// (className, style, etc.). This augments the source interface in
// @hugeicons/react so the properties survive the Omit.

declare module '@hugeicons/react' {
  interface HugeiconsIconProps {
    className?: string;
    style?: React.CSSProperties;
  }
}

export {};
