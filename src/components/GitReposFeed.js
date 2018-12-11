import React, { useState, useRef } from "react";
import axios from "axios";
import { GitRepo } from "./GitRepo";
import { useInfiniteScroll } from "../lib/useInfiniteScroll";

export const GitReposFeed = () => {
  const [items, setItems] = useState([]);
  const [lastLoadedItem, setLastLoadedItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef();

  useInfiniteScroll(listRef, () => isLoading, () => {
    setIsLoading(true);
    axios
      .get("https://api.github.com/repositories", {
        params: {
          since: lastLoadedItem
        }
      })
      .then(({ data }) => {
        setItems([...items, ...data]);
        setLastLoadedItem(data[data.length - 1].id);
        setIsLoading(false);
      });
  });

  return items.length ? (
    <ul className="repos-list" ref={listRef}>
      {items.map(item => (
        <li className="repos-list__item" key={item.id}>
          <GitRepo repo={item} />
        </li>
      ))}
    </ul>
  ) : (
    "Loading..."
  );
};
