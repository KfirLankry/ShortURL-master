import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { createShortUrl, getAllUrls } from "../services/urlService";
import { successMsg, errorMsg, infoMsg } from "../services/feedbackService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "./Table";

function Home() {
  const [urls, setUrls] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const currentUrl = window.location.href;
  const copyLink = () => {
    navigator.clipboard.writeText(`${currentUrl}${shortUrl}`);
    infoMsg("Link Copied Successfully!");
  };

  React.useEffect(() => {
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
                  type="url"
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
      <Table urls={urls} currentUrl={currentUrl} />
      <Footer />
    </>
  );
}

export default Home;
