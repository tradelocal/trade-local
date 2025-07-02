import React, { useState, useEffect } from "react";

const tradespeople = [
  {
    name: "Paul's Plastering",
    trade: "Plasterer",
    location: "Bristol",
    distance: 7,
    contact: "paul@plastering.com",
    website: "https://paulsplastering.co.uk"
  },
  {
    name: "Emma's Electrics",
    trade: "Electrician",
    location: "Bath",
    distance: 14,
    contact: "emma@electrician.com",
    website: "https://emmaselectrics.co.uk"
  },
  {
    name: "Dan the Decorator",
    trade: "Painter",
    location: "Swindon",
    distance: 22,
    contact: "dan@decorator.com",
    website: "https://dandecorates.com"
  }
];

const affiliateAds = {
  Plasterer: {
    text: "Upgrade your plastering kit – Check out deals on Amazon",
    link: "https://www.amazon.co.uk/s?k=plastering+tools&tag=youraffiliatetag"
  },
  Electrician: {
    text: "Insulated electrician tools on sale – Amazon UK",
    link: "https://www.amazon.co.uk/s?k=electrician+tools&tag=youraffiliatetag"
  },
  Painter: {
    text: "Best paint brushes & rollers – Buy now on Amazon",
    link: "https://www.amazon.co.uk/s?k=painting+tools&tag=youraffiliatetag"
  }
};

function App() {
  const [trade, setTrade] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8981830100711429";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  const handleSearch = () => {
    const filtered = tradespeople.filter(
      (p) =>
        p.trade.toLowerCase().includes(trade.toLowerCase()) &&
        p.distance <= 20
    );
    setResults(filtered);
  };

  const ad = affiliateAds[trade];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Trade Local</h1>

      <input
        placeholder="Enter trade (e.g. Plasterer)"
        value={trade}
        onChange={(e) => setTrade(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        placeholder="Enter your location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSearch}>Find Tradespeople</button>

      {ad && (
        <div style={{ background: "#fff7cc", padding: "10px", marginTop: "20px" }}>
          <p>Sponsored</p>
          <a href={ad.link} target="_blank" rel="noopener noreferrer">
            {ad.text}
          </a>
        </div>
      )}

      <div>
        {results.length === 0 && <p>No results yet. Try searching above.</p>}
        {results.map((p, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <h3>{p.name}</h3>
            <p>{p.trade} - {p.location}</p>
            <p>Distance: {p.distance} miles</p>
            <a href={`mailto:${p.contact}`}>{p.contact}</a><br />
            <a href={p.website} target="_blank" rel="noopener noreferrer">Visit website</a>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8981830100711429"
          data-ad-slot="YOUR_SLOT_ID"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
      </div>
    </div>
  );
}

export default App;
