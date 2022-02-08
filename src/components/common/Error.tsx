type Props = {
  error: any
}

const Error = ({ error }: Props) => {
  return (
    <div className="mx-auto my-5">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}

export default Error
