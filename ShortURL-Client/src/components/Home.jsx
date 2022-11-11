import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { createShortUrl, getAllUrls } from "../services/urlService";
import { successMsg, errorMsg, infoMsg } from "../services/feedbackService";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const [urls, setUrls] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const currentUrl = window.location.href;
  const copyLink = () => {
    navigator.clipboard.writeText(`${currentUrl}${shortUrl}`);
    infoMsg("Link Copied Successfully!");
  };

  useEffect(() => {
    //* Getting all Urls From DB white component
    getAllUrls()
      .then((result) => {
        // Sets urls State to Result Data
        setUrls(result.data);
      })
      .catch((err) => {
        errorMsg("Something went wrong...");
      });
  }, [isChanged]);

  // Form Validation & Posting Link to db
  const formik = useFormik({
    initialValues: {
      full: "",
      clicks: 0,
    },
    validationSchema: yup.object({
      full: yup.string().required("Please Add Url").min(8),
      clicks: yup.number().required(),
    }),
    onSubmit: (values) => {
      formik.resetForm({ full: "" });
      // setShortUrl()
      createShortUrl(values)
        .then((result) => {
          setShortUrl(result.data.short);
          // Updates isChanged Variable and Render the components with new info
          setIsChanged(!isChanged);
          successMsg("Short URL Was Created!");
        })
        .catch((err) => {
          errorMsg("Error in Create Short URL...");
        });
    },
  });
  return (
    <>
      <Navbar />
      <div className="top">
        <div className="form" data-aos="zoom-in" data-aos-duration="1000">
          <h1 className="title container text-white text-center">
            "<strong>ShortURLs</strong>" is a free tool to shorten URLs.
          </h1>
          <h1 className="title container text-white text-center mb-4">
            Create short & memorable links in seconds.
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <div className="input-group input container mt-2">
                <input
                  id="full"
                  type="text"
                  name="full"
                  className="form-control"
                  placeholder="e.g http://www.a-very-long-url.com"
                  value={formik.values.full}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  className="btn btn-primary bigBtn"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  id="button-addon2"
                >
                  Shrink My Link{" "}
                  <i className="fa-solid fa-circle-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Form Error Messages */}
            <div className="msg text-center">
              {formik.touched.full && formik.errors.full ? (
                <p className="err mt-2">
                  <i className="fa-solid fa-circle-exclamation mx-1"></i>
                  <strong>{formik.errors.full}</strong>
                </p>
              ) : null}
            </div>
          </form>
        </div>
        {/* Presenting the shortURL below the input */}
        {shortUrl ? (
          <div
            className="alert mx-auto alert-success text-center mt-3"
            role="alert"
          >
            <i className="fa-solid fa-link"></i> Your Shrinked link is:{" "}
            <a href={shortUrl} target="_blank">{`${currentUrl}${shortUrl}`}</a>{" "}
            <button
              className="btn btn-primary btn-sm copyBtn mb-1 mx-2 "
              onClick={copyLink}
            >
              <i className="fa-solid fa-copy copyBtn"> </i> Copy Link
            </button>
          </div>
        ) : null}
        {/* Wave Animation */}
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      {/* Table */}
      <div className="bottom container mt-4">
        {urls.length ? (
          <table
            className="table mb-5 mt-2 mx-auto table-bordered table-striped table-responsive"
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
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a className="urlDots" href={url.full} target="_blank">
                      {url.full}
                    </a>
                  </td>
                  <td className="text-center w-25">
                    <a className="shortUrl" href={url.short} target="_blank">
                      {`${currentUrl}${url.short}`}
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
      <Footer />
    </>
  );
}

export default Home;
