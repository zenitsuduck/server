const mineflayer = require('mineflayer')
const http = require('http')

// --- ЭТОТ БЛОК НУЖЕН ДЛЯ RENDER ---
// Создаем фейковый веб-сервер, чтобы Render не выключал бота
http.createServer((req, res) => {
  res.write("I am alive");
  res.end();
}).listen(8080);
// ---------------------------------

const botArgs = {
  host: 'svatoi.hleb.play.hosting',
  port: 25565,
  username: 'Server_Guard',
  version: '1.21.11' 
};

function pulse() {
  console.log(`[${new Date().toLocaleTimeString()}] Отправка пакета активности...`);
  
  const bot = mineflayer.createBot(botArgs);

  bot.on('error', () => {}); 
  bot.on('kicked', () => {});

  setTimeout(() => {
    bot.quit();
  }, 5000);
}

pulse();
setInterval(pulse, 30000);
