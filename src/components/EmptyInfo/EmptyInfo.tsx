import satelite from "/satellite.gif";
import telescopio from "/launching rocket.gif";
import cohete from "/telescope.gif";
import "./EmptyInfo.scss";

export default function EmptyInfo({
  mssg,
  img,
}: {
  mssg: string;
  img: string;
}) {
  function imgAssign(string: string) {
    switch (string) {
      case "satelite":
        return satelite;
      case "telescopio":
        return telescopio;
      case "cohete":
        return cohete;
      default:
        return "";
    }
  }

  return (
    <div className="emptyinfo d-flex flex-column justify-content-between align-items-center">
      <img className="emptyinfo-img mb-3 animation" src={imgAssign(img)} />
      <div className="message bold">{mssg}</div>
    </div>
  );
}
