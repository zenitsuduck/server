const mineflayer = require('mineflayer')
const http = require('http')

// --- БЛОК ДЛЯ RENDER (ОБЯЗАТЕЛЬНО) ---
// Создаем сервер, чтобы Render видел активность на порту
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
});

// Слушаем порт, который выдает Render (обычно 10000) или 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Веб-сервер запущен на порту ${PORT}`);
});
// -------------------------------------

const botArgs = {
  host: 'svatoi.hleb.play.hosting',
  port: 25565,
  username: 'Server_Guard',
  version: '1.21.11' 
};

function pulse() {
  console.log(`[${new Date().toLocaleTimeString()}] Отправка пакета активности...`);
  
  const bot = mineflayer.createBot(botArgs);

  // Игнорируем ошибки (Fabric и т.д.), нам нужен только сам факт коннекта
  bot.on('error', () => {}); 
  bot.on('kicked', () => {});

  // Закрываем через 5 секунд, чтобы подготовить новый цикл
  setTimeout(() => {
    bot.quit();
  }, 5000);
}

// Стучимся каждые 30 секунд
pulse();
setInterval(pulse, 30000);

