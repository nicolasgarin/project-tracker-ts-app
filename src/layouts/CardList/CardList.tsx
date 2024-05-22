
export const CardList = (props: any) => {
  const { children } = props;

  return (
    <>
      <div className="cardlist card-container d-flex">
          <div className="row">
              {children}
          </div>
      </div>
    </>
  )
}
