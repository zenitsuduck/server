const mineflayer = require('mineflayer')

const botArgs = {
  host: 'svatoi.hleb.play.hosting',
  port: 25565,
  username: 'Server_Guard',
  version: '1.21.11' 
};

function pulse() {
  console.log(`[${new Date().toLocaleTimeString()}] Отправка пакета активности...`);
  
  const bot = mineflayer.createBot(botArgs);

  // Нам нужен только факт коннекта, ошибки игнорируем
  bot.on('error', () => {}); 
  bot.on('kicked', () => {});

  // Закрываем через 5 сек, чтобы подготовить новый цикл
  setTimeout(() => {
    bot.quit();
  }, 5000);
}

// Запуск каждые 30 секунд (лимит сервера 60 сек)
pulse();
setInterval(pulse, 30000);
