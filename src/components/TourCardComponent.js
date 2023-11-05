import image1 from "../assets/images/1.jpg";
import "../style/TourCard.css";

export default function TourCardComponent({ data }) {
  return (
    <>
      <div className="tourcard-container flex-row">
        <div
          className="image-container"
          style={{
            backgroundImage: `url(${data.imgUrl})`,
            backgroundSize: "cover"
          }}
        ></div>
        <div className="col-1">
          <div className="duration-type-container flex-row align-center">
            <p className="duration-text dt-text">{data.duration} hrs</p>
            <div className="circle-separator" />
            <p className="type-text dt-text">{data.category}</p>
          </div>
          <p className="tour-title-txt">{data.title}</p>
          <p className="city-txt">{data.city}</p>
          {data.freeCancel && (
            <p className="free-cancel-txt">Free cancellation</p>
          )}
        </div>
        <div className="col-2">
          <p className="rating-text">
            Rating: <span>{data.rating}</span>
          </p>
          <p className="reviews-text">{data.reviewCount} reviews</p>
          <div className="price-div">
            <p className="price-txt">$ {data.price} </p>
            <p className="small-txt">/ adult</p>
          </div>
          <button className="tour-detail-btn">View detail</button>
        </div>
      </div>
    </>
  );
}
