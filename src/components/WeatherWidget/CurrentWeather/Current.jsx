function Current({ valueIcon, currentValue, realValueUnit }) {
  return (
    <li>
      {valueIcon}
      <span>{currentValue}</span>
      {realValueUnit}
    </li>
  );
}

export default Current;
