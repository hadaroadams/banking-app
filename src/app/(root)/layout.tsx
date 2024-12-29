import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main> side bar{children} </main>;
};

export default RootLayout;
