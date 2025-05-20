document.addEventListener("DOMContentLoaded", async () => {
  const SQL = await initSqlJs({ locateFile: file => `sqljs/${file}` });

  const db = new SQL.Database();
  db.run("CREATE TABLE people (name TEXT, birthday TEXT);");
  db.run("INSERT INTO people VALUES ('Alice', '2005-05-19');");
  db.run("INSERT INTO people VALUES ('Bob', '2006-12-22');");

  const today = new Date().toISOString().slice(5, 10); // MM-DD

  const result = db.exec(
    "SELECT name FROM people WHERE substr(birthday, 6, 5) = ?",
    [today]
  );

  if (result.length > 0) {
    const names = result[0].values.map(row => row[0]).join(", ");
    const alert = document.createElement("div");
    alert.className = "alert alert-success";
    alert.role = "alert";
    alert.innerText = `🎉 Today is ${names}'s birthday!`;
    document.body.prepend(alert);
  }
});