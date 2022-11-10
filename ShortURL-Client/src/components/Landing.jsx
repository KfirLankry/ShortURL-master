import { useParams, useNavigate } from "react-router-dom";
import { shortUrl } from "../services/urlService";
import { errorMsg } from "../services/feedbackService";

function Landing() {
  const navigate = useNavigate();
  const { shortId } = useParams();
  // Fetching shortURL Changes from DB and attaching to the current ShortURL
  const fetchUrl = async () => await shortUrl(shortId);

  fetchUrl()
    // Getting the full Link with Object Destructuring from the Object
    .then(({ data }) => {
      // Redirecting the page to the full Link
      window.location.href = data;
    })
    .catch((err) => {
      errorMsg("Ops.. Something went wrong.");
      navigate("/");
    });

  return <></>;
}

export default Landing;
