import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as api from "../../api";

import "./Reviews.scss";

export function Reviews() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);

  const getReviews = () => {
    if (!phoneNumber) {
      return toast("Введіть номер телефону", { type: "warning" });
    }

    api.get(`${api.endpoint}/reviews/check/${phoneNumber}`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: "error" });
      } else {
        setReviews(data);
        setAvgRating(
          data.reduce((acc: number, val: any) => acc + Number(val.rating), 0) /
            data.length
        );
        if (data.length === 0) {
          toast("Відгуків за цим номером не знайдено", { type: "warning" });
        }
      }
    });
  };

  return (
    <div className="reviews">
      <Link to="/">
        <svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 714.6 401.1"
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M502.8 0h211.8l-23 39.7-138.5 240L483 401H342.7L413 279.6 251.4 0h140.3L483 158.1 538.6 62 502.8 0Zm-201 279.6L140.1 0H0l231.7 401 70-121.4Z"
          />
        </svg>
      </Link>
      <div className="section">
        <div className="form">
          <div className="text-center">
            <h4 className="mb-4 pb-3">Отримати відгуки про номер</h4>
          </div>
          <div className="form-input-1">
            <input
              type="tel"
              name="phone-number"
              autoComplete="off"
              placeholder="Номер телефону"
              className="form-style"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <i
              className="input-icon fa fa-phone"
              style={{ fontSize: "24px" }}
            ></i>
          </div>
          <div className="form-input-3"></div>
          <div className="button-center">
            <a className="btn mt-4" onClick={getReviews}>
              запросити
            </a>
          </div>

          <hr />

          {reviews.length ? (
            <div className="avgRating">Середній рейтинг: {avgRating.toFixed(2)}</div>
          ) : (
            ""
          )}

          <div className="reviews-container">
            {reviews.map((review) => {
              return (
                <div key={review._id} className="review">
                  <div className="description">{review.description}</div>
                  <div className="rating">{review.rating}/5</div>
                  {review.attachments.map((source: string) => {
                    return <img src={source} className="attachment" />;
                  })}
                  <div className="date-added">
                    Додано: {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
