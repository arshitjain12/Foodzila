import "./itemSelectionModal.css";
const ItemSelectionModal = ({ items, onSelect, close }) => {
  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h3>Select Item to Review</h3>
        <p>You have multiple pending item to review</p>

        <div className="item-selection-list">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelect(item.food)}
              className="item-selection-btn"
            >
              <span>{item.name}</span>
              <span style={{ fontSize: "12px" }}>Review ➤</span>
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelectionModal;
