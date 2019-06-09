import { useEffect } from "react";

export function useInfiniteScroll(forwardedRef, isLoading, loadMoreItems) {
  const shouldLoadMoreItems = () =>
    !isLoading() &&
    forwardedRef.current &&
    forwardedRef.current.getBoundingClientRect().bottom <
      window.innerHeight + window.pageYOffset;

  const onWindowEvent = () => shouldLoadMoreItems() && loadMoreItems();

  useEffect(() => {
    window.addEventListener("scroll", onWindowEvent);
    window.addEventListener("resize", onWindowEvent);
    return () => {
      window.removeEventListener("scroll", onWindowEvent);
      window.removeEventListener("resize", onWindowEvent);
    };
  });

  useEffect(loadMoreItems, []);
}
