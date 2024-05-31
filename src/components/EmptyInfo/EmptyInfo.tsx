import satelite from "/satellite.gif";
import telescopio from "/launching rocket.gif";
import cohete from "/telescope.gif";
import "./EmptyInfo.scss";

export default function EmptyInfo({
  mssg,
  img,
}: {
  mssg: string;
  img?: "satelite" | "telescopio" | "cohete";
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
    <div className={`emptyinfo d-flex flex-column justify-content-between align-items-center`}>
      {img && (
        <img className="emptyinfo-img mb-3 animation" src={imgAssign(img)} />
      )}
      <h4 className="message bold">{mssg}</h4>
    </div>
  );
}
