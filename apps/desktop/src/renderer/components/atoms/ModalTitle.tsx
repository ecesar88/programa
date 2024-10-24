export const ModalTitle = ({ title }: { title: string | React.ReactNode }): React.ReactNode => {
  return (
    <div className="text-2xl font-bold pb-2">
      <h2>{title}</h2>
    </div>
  )
}
