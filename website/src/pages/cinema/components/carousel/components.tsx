import React from "react";

const Provider = React.forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref} className="h-full w-full overflow-hidden">
      {props.children}
    </div>
  );
});

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full h-full">{children}</div>
);

const Slide = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      margin: "1rem",
      flex: "0 0 100%",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
    }}
  >
    {children}
  </div>
);

export { Provider, Container, Slide };
