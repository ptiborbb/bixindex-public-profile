export const calculateLoadOffset = (
  { page, rowsPerPage, count }: { page: number; rowsPerPage: number; count: number | null },
  _default: number,
): number | null => (page * rowsPerPage >= (count ?? 0) ? null : _default);
export const calculateContainerHeight = (
  { profiles }: { profiles: unknown[] | null },
  defaultElementHeight: number,
): number => Math.max(defaultElementHeight * 2, (profiles?.length || 0 + 1) * defaultElementHeight);
