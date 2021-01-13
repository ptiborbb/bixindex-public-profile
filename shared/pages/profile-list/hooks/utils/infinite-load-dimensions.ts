export const calculateLoadOffset = (
  { page, rowsPerPage, count }: { page: number; rowsPerPage: number; count: number },
  _default: number,
): number => (page * rowsPerPage >= count ? null : _default);
export const calculateContainerHeight = ({ profiles }: { profiles: unknown[] }, defaultElementHeight: number): number =>
  Math.max(defaultElementHeight * 2, (profiles?.length + 1) * defaultElementHeight);
