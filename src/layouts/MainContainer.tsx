export const MainContainer = (props: any) => {
  const { children, className } = props;

  return (
    <div className={`main ${className !== undefined ? className : ""}`}>
      <div className="container-lg">{children}</div>
    </div>
  );
};
