declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module "@/global.css";
declare module "*.css";
