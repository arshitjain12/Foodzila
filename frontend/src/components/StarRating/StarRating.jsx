const StarRating = ({ value }) => {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= value ? "gold" : "#ccc",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
