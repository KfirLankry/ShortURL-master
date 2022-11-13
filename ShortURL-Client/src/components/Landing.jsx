import { useParams, useNavigate } from "react-router-dom";
import { paramsHandler } from "../services/urlService";
import { errorMsg } from "../services/feedbackService";

function Landing() {
  const navigate = useNavigate();

  // Store the parameter into variable
  const { shortId } = useParams();

  // Fetching shortURL from DB and attaching to the current ShortURL
  const fetchUrl = async () => await paramsHandler(shortId);

  fetchUrl()
    // Getting the full Link with Object Destructuring from the Object
    .then(({ data }) => {
      // Redirecting the shortURL to Full URL
      window.location.href = data;
    })
    .catch((err) => {
      // errorMsg("Ops.. Something went wrong...");
      // navigate("/");
    });

  return <></>;
}

export default Landing;
