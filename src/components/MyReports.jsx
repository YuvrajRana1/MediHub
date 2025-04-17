function MyReports() {
  // Styles to ensure full width and height
  const fullScreenStyle = {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    overflow: "hidden"
  }

  const contentStyle = {
    width: "100%",
    height: "100%",
    padding: "2rem",
    boxSizing: "border-box"
  }

  return (
    <>
      {/* Global styles to reset any body/html constraints */}
      <style>
        {`
          body, html, #root {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
      
      <div style={fullScreenStyle}>
        <div style={contentStyle}>
          <div className="bg-white rounded shadow-lg p-4 mb-4">
            <h1 className="display-5 fw-bold text-primary mb-3">My Reports</h1>
            <p className="text-secondary fs-5">This section will display your medical reports.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyReports