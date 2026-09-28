import { useState } from "react";
import "./PostComposer.css";

const PLATFORMS = {
  twitter: { label: "Twitter", limit: 280 },
  linkedin: { label: "LinkedIn", limit: 3000 },
};

export default function PostComposer() {
  const [platform, setPlatform] = useState("twitter");
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  const { label, limit } = PLATFORMS[platform];
  const count = text.length;
  const overBy = count - limit;
  const isOver = overBy > 0;
  const isEmpty = text.trim().length === 0;

  function handleChange(e) {
    setText(e.target.value);
    setPosted(false);
  }

  function handlePlatform(key) {
    setPlatform(key);
    setPosted(false);
  }

  function handleSubmit() {
    if (isOver || isEmpty) return;
    // Replace this with a real API call.
    console.log(`Posting to ${label}:`, text);
    setPosted(true);
    setText("");
  }

  return (
    <section className="composer" data-platform={platform}>
      <h1 className="composer__title">Write a post</h1>

      <div className="composer__platforms" role="radiogroup" aria-label="Platform">
        {Object.entries(PLATFORMS).map(([key, p]) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={platform === key}
            className={`platform ${platform === key ? "platform--active" : ""}`}
            onClick={() => handlePlatform(key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <label htmlFor="post-text" className="visually-hidden">
        Post text
      </label>
      <textarea
        id="post-text"
        className={`composer__textarea ${isOver ? "composer__textarea--error" : ""}`}
        value={text}
        onChange={handleChange}
        placeholder={`What do you want to share on ${label}?`}
        rows={7}
        aria-invalid={isOver}
        aria-describedby="post-status"
      />

      <div className="composer__footer" id="post-status">
        <p className="composer__error" role="alert">
          {isOver
            ? `${overBy} character${overBy === 1 ? "" : "s"} over the ${label} limit. Shorten your post to publish.`
            : ""}
        </p>
        <p className={`composer__count ${isOver ? "composer__count--error" : ""}`}>
          {count} / {limit}
        </p>
      </div>

      <div className="composer__actions">
        <button
          type="button"
          className="composer__submit"
          onClick={handleSubmit}
          disabled={isOver || isEmpty}
        >
          Post to {label}
        </button>
        {posted && (
          <span className="composer__success" role="status">
            Posted to {label}
          </span>
        )}
      </div>
    </section>
  );
}
