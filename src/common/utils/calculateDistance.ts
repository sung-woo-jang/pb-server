export interface Coordinate {
  mapx: number;
  mapy: number;
}

export default function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371; // 지구의 반경 (km)

  // 위도와 경도를 라디안으로 변환
  const lat1 = (coord1.mapy * Math.PI) / 180;
  const lat2 = (coord2.mapy * Math.PI) / 180;
  const lon1 = (coord1.mapx * Math.PI) / 180;
  const lon2 = (coord2.mapx * Math.PI) / 180;

  // 위도와 경도의 차이
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  // Haversine 공식
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 거리 계산 (km)
  return R * c;
}

// 사용 예시
