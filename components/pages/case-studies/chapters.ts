// Shared by the (server-rendered) case study page and the client ChapterNav.

/** Anchor id of the n-th (1-based) narrative chapter. */
export function chapterId(index: number) {
  return `chapter-${index + 1}`
}

/** Id of the wrapper that holds all narrative chapters (used for visibility). */
export const CHAPTERS_WRAPPER_ID = "case-study-chapters"
