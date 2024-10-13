function SpinnerLoader() {
  return (
    <div className="homeSpinner">
      <l-ring
        size="70"
        stroke="6"
        bg-opacity="0"
        speed="1.3"
        color="#581C87"
      ></l-ring>
    </div>
  );
}

export default SpinnerLoader;
