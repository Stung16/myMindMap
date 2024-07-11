function RecentIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 120 120"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <circle cx="60" cy="60" r="60" opacity=".2"></circle>
        <path d="M60 30.667C76.2 30.667 89.333 43.8 89.333 60S76.2 89.333 60 89.333 30.667 76.2 30.667 60 43.8 30.667 60 30.667zM60 36c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm0 8a2.667 2.667 0 0 1 2.667 2.667v12.228l7.219 7.22a2.667 2.667 0 0 1-3.772 3.77l-8.78-8.78V46.667A2.667 2.667 0 0 1 60 44z"></path>
      </g>
    </svg>
  )
}

export default RecentIcon
