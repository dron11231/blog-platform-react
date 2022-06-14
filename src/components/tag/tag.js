import React from 'react';
import './tag.scss';

export default function Tag({ setTags, id, value, tagList }) {
  let lastElem = tagList.reduce((acc, value) => {
    if (value.id > acc.id) {
      acc = value;
    }
    return acc;
  });

  const button =
    lastElem.id === id ? (
      <button
        className="tag__add-btn"
        type="button"
        onClick={() => {
          setTags((tags) => {
            const newArr = [...tags];
            const last = newArr.length - 1;
            let id = newArr[last].id + 1;
            newArr.push({ id: id, text: '' });
            return newArr;
          });
        }}
      >
        Add tag
      </button>
    ) : null;
  return (
    <div className="tag">
      <input
        name={'tag' + id}
        value={value}
        onChange={(e) =>
          setTags((tags) => {
            const idx = tags.findIndex((tag) => id === tag.id);
            const newArr = [...tags];
            newArr[idx].text = e.target.value;
            return newArr;
          })
        }
        type="text"
        placeholder="tag"
        className="tag__input"
      />
      <button
        onClick={() => {
          setTags((tags) => {
            const idx = tags.findIndex((tag) => id === tag.id);
            const newArr = [...tags];
            if (newArr.length !== 1) {
              newArr.splice(idx, 1);
            }
            return newArr;
          });
        }}
        type="button"
        className="tag__delete-btn"
      >
        Delete
      </button>
      {button}
    </div>
  );
}
