const mineflayer = require('mineflayer')
const http = require('http')

// 1. ЭТОТ БЛОК УБЕРЕТ ОШИБКУ "FAILED" И "TIMED OUT"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is Running');
});

// Автоматически подхватываем порт от Render
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Веб-интерфейс запущен на порту ${PORT}`);
});

// 2. НАСТРОЙКИ БОТА
const botArgs = {
  host: 'svatoi.hleb.play.hosting',
  port: 25565,
  username: 'Server_Guard',
  version: '1.21.11' 
};

function pulse() {
  console.log(`[${new Date().toLocaleTimeString()}] Отправка пакета активности...`);
  
  const bot = mineflayer.createBot(botArgs);

  // Игнорируем ошибки (Fabric и т.д.), нам нужен только коннект
  bot.on('error', () => {}); 
  bot.on('kicked', () => {});

  // Закрываем через 5 секунд, чтобы подготовить новый цикл
  setTimeout(() => {
    bot.quit();
  }, 5000);
}

// Запуск каждые 30 секунд
pulse();
setInterval(pulse, 30000);
