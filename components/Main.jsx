import React from "react";

export default function Main() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imgUrl: "http://i.imgflip.com/1bij.jpg",
  });
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  //1. Get the data
  //2. Save data in state
  // fetch(url).then(res=>res.json()).then(data=> console.log(data))
  // const [count, setCount] = React.useState(1);
  // const [starWarsData, setStarWarsData] = React.useState({});
  // React.useEffect(() => {
  //   fetch(`https://swapi.py4e.com/api/planets/${count}/`)
  //     .then((res) => res.json())
  //     .then((data) => setStarWarsData(data));
  // }, [count]);

  const [allMemes, setAllMemes] = React.useState([]);
  React.useEffect(() => {
    let memes;
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        memes = data.data.memes;
        setAllMemes(memes);
      });
  }, []);

  function generate() {
    const imgUrlIndex = Math.floor(Math.random() * 100);
    const imgUrls = allMemes[imgUrlIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      imgUrl: imgUrls,
      topText: "",
      bottomText: "",
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={generate}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
