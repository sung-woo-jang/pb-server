import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

const pgSessionStore = pgSession(session);

// PostgreSQL 연결 풀 설정
const pgPool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_DB_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export const sessionConfig = session({
  store: new pgSessionStore({
    pool: pgPool,
  }),
  secret: process.env.POSTGRES_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  //   cookie: {
  //     domain: '.example.com', // 메인 도메인 및 서브도메인에서 사용 가능하도록 설정
  //     secure: false, // HTTPS에서만 사용할 것인지 여부
  //     httpOnly: true, // 클라이언트에서 쿠키에 접근하는 것을 막음
  //     maxAge: 24 * 60 * 60 * 1000 // 쿠키 만료 시간 설정 (예: 1일) // 1000 = 1초
  // }
});