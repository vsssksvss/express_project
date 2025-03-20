// bit.ly/smcom2025

const express = require('express');
const app = express();
// cors 문제 해결
const cors = require('cors');
app.use(cors());
// json으로 된 post의 바디를 읽기 위해 사용
app.use(express.json())
const PORT = 3000;

// SQLite 데이터베이스 연결
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  });

  


app.post('/articles', (req, res) => {
    const { title, content } = req.body;
  
    db.run(`INSERT INTO articles (title, content) VALUES (?, ?)`,
      [title, content],
      function(err) {
        if (err) {
          return res.status(500).json({error: err.message});
        }
        res.json({id: this.lastID, title, content});
    });
});
  
app.get('/articles', (req, res)=> {
    
    res.send('dd')
})