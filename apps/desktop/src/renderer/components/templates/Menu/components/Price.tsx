export const Price = (props: { price: number }) => {
  return (
    <div className="flex flex-row min-w-[70px] justify-between">
      <div>
        <b>R$&nbsp;</b>
      </div>

      <div>
        <b>{props.price?.toFixed(2)}</b>
      </div>
    </div>
  )
}
