export default function GoogleTrends() {
  return (
    <div className="w-full max-w-[800px] h-[300px] sm:h-[400px] md:h-[450px] border border-gray-200 rounded-lg overflow-hidden">
      <iframe
        src="https://trends.google.com/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22decaf%22%2C%22geo%22%3A%22US%22%2C%22time%22%3A%222004-01-01%202025-12-04%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=240&eq=date%3Dall%26geo%3DUS%26q%3Ddecaf"
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        title="Google Trends: Decaf Coffee"
      />
    </div>
  );
}

