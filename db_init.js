const sqlite3 = require('sqlite3').verbose();

// SQLite DB 연결
const db = new sqlite3.Database('./database.db');

// 테이블 준비 함수
function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("테이블 생성 에러:", err);
    } else {
      console.log("테이블 준비 완료(articles)");
    }
  });
}
// 테이블 생성
db.serialize(() => {
  db.run(`CREATE TABLE articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
  )`);
  db.run(`CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER,
      content TEXT,
      FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
  )`);
});


initDB();

