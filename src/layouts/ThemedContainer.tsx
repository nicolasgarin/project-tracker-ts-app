import useUserOptions from "../context/UserOptionsContext";

export const ThemedContainer = (props: any) => {
  const { theme } = useUserOptions();
  const { children, className } = props;

  return <div className={`${className} ${theme}`}>{children}</div>;
};
