export const MainContainer = (props: any) => {
  const { children } = props;

  return (
    <div className="main">
      <div className="container-lg">{children}</div>
    </div>
  );
};
