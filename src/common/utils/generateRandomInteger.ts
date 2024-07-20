/**
 * 주어진 범위 내에서 임의의 정수를 생성하는 함수
 * @param min - 생성할 난수의 최소값 (포함), 기본값은 1
 * @param max - 생성할 난수의 최대값 (포함), 기본값은 10
 * @returns 범위 내에서 생성된 임의의 정수
 */
export const generateRandomInteger = (min: number = 1, max: number = 10): number => {
  min = Math.ceil(min); // 최소값 올림
  max = Math.floor(max); // 최대값 내림
  return Math.floor(Math.random() * (max - min + 1)) + min; // 최소값과 최대값 포함
};
