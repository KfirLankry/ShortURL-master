function Table(props) {
  return (
    <>
      {/* Table */}
      <div className="bottom container mt-4">
        {props.urls.length ? (
          <table
            className="table mb-5 mt-2 mx-auto table-bordered table-striped table-responsive table-hover"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <thead>
              <tr className="text-center">
                <th>Full URLs</th>
                <th className="w-50">Short URLs</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {/* Printing all existing Urls to the table */}
              {props.urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a className="urlDots" href={url.full} target="_blank">
                      {url.full}
                    </a>
                  </td>
                  <td className="text-center w-25">
                    <a className="shortUrl" href={url.short} target="_blank">
                      {`${props.currentUrl}${url.short}`}
                    </a>
                  </td>
                  <td className="text-center">{url.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {/* "No Links" Message incase the table is empty */}
            <div className="message">
              <h5
                className="text-center mt-3"
                style={{ color: "rgb(166, 166, 166)" }}
              >
                <i className="fa-solid fa-circle-exclamation mt-5"></i> There
                are no links in here...
              </h5>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Table;
