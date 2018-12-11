import { useEffect, useState } from "react";

export function useInfiniteScroll(forwardedRef, isLoading, loadMoreItems) {
  const [initialized, setInitialized] = useState(false);
  const shouldLoadMoreItems = () =>
    !isLoading() &&
    forwardedRef.current &&
    forwardedRef.current.getBoundingClientRect().bottom <
      window.innerHeight + window.pageYOffset;

  const onWindowEvent = () => shouldLoadMoreItems() && loadMoreItems();

  useEffect(() => {
    window.addEventListener("scroll", onWindowEvent);
    window.addEventListener("resize", onWindowEvent);
    if (!initialized) {
      loadMoreItems();
      setInitialized(true);
    }
    return () => {
      window.removeEventListener("scroll", onWindowEvent);
      window.removeEventListener("resize", onWindowEvent);
    };
  });
}
