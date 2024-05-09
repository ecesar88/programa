interface HeaderProps {
  title: string
}

export const Header = (props: HeaderProps) => {
  return (
    <div className="flex pb-2 border-b-2 border-0 border-solid border-gray2">
      <h1 className="text-4xl font-bold">{props.title}</h1>
    </div>
  )
}
