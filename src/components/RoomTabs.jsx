
export default function RoomTabs() {

  return (
    <div className="room-tabs">
      <div className="room-tabs__header">
        <h2 className="room-tabs__title">Rum</h2>
        <button className="room-tabs__see-all">
          Vis alle <img src="../public/icons/icon_drop-down.png" alt="" />
        </button>
      </div>

      <div className="room-tabs__list">
          <button className="room-tabs__button">
            <img src="../public/icons/icon_bedroom.png" alt="bedroom" />
            Soveværelse
          </button>
          <button className="room-tabs__button">
            <img src="../public/icons/icon_living-room.png" alt="living-room" />
            Stue
          </button>
          <button className="room-tabs__button">
            <img src="../public/icons/icon_bathroom.png" alt="bathroom" />
            Badeværelse
          </button>
          <button className="room-tabs__button">
            <img src="../public/icons/icon_kitchen.png" alt="kitchen" />
            Køkken
          </button>
      </div>
    </div>
  );
}