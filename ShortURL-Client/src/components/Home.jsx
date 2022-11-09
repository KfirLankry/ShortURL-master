import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { createShortUrl, getAllUrls } from "../services/urlService";
import { successMsg, errorMsg } from "../services/feedbackService";
import Navbar from "./Navbar";

function Home() {
  const [urls, setUrls] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const currentUrl = window.location.href;

  useEffect(() => {
    //* Getting all Urls From DB
    getAllUrls()
      .then((result) => {
        // Sets urls State to Result Data
        setUrls(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChanged]);

  // Form Validation & Posting Link to db
  const formik = useFormik({
    initialValues: {
      full: "",
      clicks: 0,
    },
    validationSchema: yup.object({
      full: yup.string().required("Please Add Url").min(10),
      clicks: yup.number().required(),
    }),
    onSubmit: (values) => {
      // setShortUrl()
      formik.resetForm({ full: "" });
      createShortUrl(values)
        .then((result) => {
          setShortUrl(result.data.short);
          // Updates isChanged Variable and Render the components
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
        <div className="form">
          <h1 className="title text-white text-center">
            "ShortURLs" is a free tool to shorten URLs.
          </h1>
          <h1 className="title text-white text-center mb-4">
            Create short & memorable links in seconds.
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <div className="input-group container w-50 mt-2">
                <input
                  id="full"
                  type="text"
                  name="full"
                  className="form-control"
                  placeholder="Paste a Long Url Here.."
                  value={formik.values.full}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  className="btn btn-primary"
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
        {shortUrl ? (
          <div
            class="alert mx-auto alert-success text-center mt-4"
            role="alert"
          >
            <i className="fa-solid fa-link"></i> Your Shrinked link is:{" "}
            <a href={shortUrl}>{`${currentUrl}${shortUrl}`}</a>
          </div>
        ) : null}
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>

      {/* Table */}
      <div className="bottom container mt-4">
        {urls.length ? (
          <table className="table mb-5 mx-auto table-bordered table-striped table-responsive">
            <thead>
              <tr className="text-center">
                <th>Full URLs</th>
                <th>Shrinked URLs</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping all Urls to the table */}
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    {" "}
                    <a href={url.full} target="_blank">
                      {url.full}
                    </a>
                  </td>
                  <td className="text-center w-25">
                    <a href={url.short} target="_blank">
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
            <div className="message">
              <h5
                className="text-center mt-3"
                style={{ color: "rgb(166, 166, 166)" }}
              >
                <i className="fa-solid fa-circle-exclamation mt-3"></i> There
                are no links in here...
              </h5>
            </div>
          </>
        )}
      </div>
      <div className="footer pt-1">
        <span>
          Developed With{" "}
          <i style={{ color: "red" }} className="fa-solid fa-heart"></i> By{" "}
          <a className="text-white" href="mailto:lankrykfir@gmail.com">
            <span className="name">Kfir Lankry</span>
          </a>
        </span>
      </div>
    </>
  );
}

export default Home;
