const addDecimalPoint = (coordinate: string | number): string => {
  if (typeof coordinate === 'number') return coordinate.toString();
  // 문자열에 이미 소수점이 포함되어 있는지 확인
  if (coordinate.includes('.')) {
    return coordinate;
  }

  // 문자열 길이 확인 및 소수점 추가
  return (coordinate.length <= 7 ? coordinate.padStart(7, '0') : coordinate).slice(0, -7) + '.' + coordinate.slice(-7);
};
export default addDecimalPoint;
