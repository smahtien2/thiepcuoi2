export default {
  async fetch(request, env) {
    try {
      // Kết nối D1 database
      const db = env.DB;

      // Ví dụ: tạo bảng nếu chưa có (chỉ chạy lần đầu)
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        );
      `);

      // Thêm dữ liệu ví dụ
      await db.prepare("INSERT INTO users (name) VALUES (?)").bind("Alice").run();

      // Lấy dữ liệu
      const { results } = await db.prepare("SELECT * FROM users").all();

      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response("Error: " + err.message, { status: 500 });
    }
  }
};
