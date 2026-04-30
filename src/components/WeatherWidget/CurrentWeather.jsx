function CurrentWeather({ currentWindSpeed, currentTemperature }) {
  return (
    <section>
      <div>{currentWindSpeed}</div>
      <div>{currentTemperature}</div>
    </section>
  );
}

export default CurrentWeather;
