import { useParams, useNavigate } from "react-router-dom";
import { redirectUrl } from "../services/urlService";
import { errorMsg } from "../services/feedbackService";

function Landing() {
  const navigate = useNavigate();
  const { shortId } = useParams();
  const fetchUrl = async () => await redirectUrl(shortId);

  fetchUrl()
    .then(({ data }) => {
      window.location.href = data;
    })
    .catch((err) => {
      errorMsg("Ops.. Something went wrong.");
      navigate("/");
    });

  return <></>;
}

export default Landing;
