export const npsToText = (nps: number): string => {
  if (nps >= 0 && nps <= 6) {
    return 'Ellenző';
  } else if (nps >= 7 && nps <= 8) {
    return 'Passzív';
  } else if (nps >= 9 && nps <= 10) {
    return 'Ajánló';
  } else {
    return 'NPS_VALUE_NOT_VALID';
  }
};
