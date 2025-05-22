const Error = () => {
  return (
    <div>
      <h1>If nothing is showed please refesh the page</h1>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  )
}

export default Error
