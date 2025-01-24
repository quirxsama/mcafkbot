const mineflayer = require('mineflayer')
const prompts = require('prompts')
const { pathfinder, goals: { GoalNear } } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')
const { createInterface } = require('readline')
const { readFileSync, writeFileSync, existsSync } = require('fs')

// Sabitleri küçült
const CONFIG = './last_config.json'
const MOVE_DELAY = 350
const JUMP_DELAY = 250

async function getBotConfig() {
  let lastConfig = {}
  
  // Son konfigürasyonu oku
  try {
    lastConfig = JSON.parse(readFileSync(CONFIG, 'utf8'))
  } catch (err) {
    lastConfig = { host: '', port: 25565, username: '' }
  }

  const questions = [
    {
      type: 'text',
      name: 'host',
      message: 'Sunucu IP adresini girin:',
      initial: lastConfig.host
    },
    {
      type: 'number',
      name: 'port',
      message: 'Port numarasını girin:',
      initial: lastConfig.port
    },
    {
      type: 'text',
      name: 'username',
      message: 'Bot kullanıcı adını girin:',
      initial: lastConfig.username
    }
  ]

  const config = await prompts(questions)
  
  // Yeni konfigürasyonu kaydet
  writeFileSync(CONFIG, JSON.stringify(config, null, 2))
  
  return config
}

async function startBot() {
  const config = await getBotConfig()
  let viewerServer = null

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: false,
    auth: 'offline'
  })

  // Pathfinder'ı yükle
  bot.loadPlugin(pathfinder)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (input) => {
    if (input.toLowerCase() === 'cikis') {
      console.log('Bot kapatılıyor...')
      bot.quit()
      rl.close()
      process.exit()
    } else if (input.startsWith('-')) {
      // Komut işleme - chate göndermeden
      handleCommand(input.slice(1), bot)
    } else {
      // Sadece normal mesajları chate gönder
      bot.chat(input)
    }
  })

  // Komut işleyici fonksiyonu
  function handleCommand(cmd, bot) {
    const [command, ...args] = cmd.split(' ')
    
    switch(command.toLowerCase()) {
      case 'gel':
        // En yakın oyuncuya gitme
        const player = bot.players[args[0]]
        if (!player || !player.entity) {
          console.log('Oyuncu bulunamadı!')
          return
        }
        const goal = new GoalNear(player.entity.position.x, player.entity.position.y, player.entity.position.z, 1)
        bot.pathfinder.setGoal(goal)
        break

      case 'takip':
        // Belirtilen oyuncuyu takip etme
        const target = bot.players[args[0]]
        if (!target || !target.entity) {
          console.log('Takip edilecek oyuncu bulunamadı!')
          return
        }
        
        const followInterval = setInterval(() => {
          if (target.entity) {
            const pos = target.entity.position
            bot.lookAt(pos)
            const goal = new GoalNear(pos.x, pos.y, pos.z, 2)
            bot.pathfinder.setGoal(goal)
          } else {
            clearInterval(followInterval)
            console.log('Oyuncu artık görünür değil')
          }
        }, 1000)
        break

      case 'kaz':
        // Bulunduğu yeri kazma
        const block = bot.blockAt(bot.entity.position.offset(0, -1, 0))
        if (block) {
          bot.dig(block)
        }
        break

      case 'dans':
        // Dans etme (rastgele hareketler)
        const dansEt = () => {
          const hareketler = ['forward', 'back', 'left', 'right', 'jump']
          const hareket = hareketler[Math.floor(Math.random() * hareketler.length)]
          bot.setControlState(hareket, true)
          setTimeout(() => bot.setControlState(hareket, false), 500)
        }
        const dansInterval = setInterval(dansEt, 1000)
        setTimeout(() => clearInterval(dansInterval), 10000)
        break

      case 'ilerle':
        if (!args[0] || !args[1]) {
          console.log('Kullanım: -ilerle --yön mesafe')
          console.log('Yönler: --sag, --sol, --ileri, --geri')
          return
        }
        
        const direction = args[0].replace('--', '')
        const blocks = parseInt(args[1]) || 1
        
        switch(direction) {
          case 'sag':
            bot.setControlState('right', true)
            setTimeout(() => bot.setControlState('right', false), blocks * MOVE_DELAY)
            break
          case 'sol':
            bot.setControlState('left', true)
            setTimeout(() => bot.setControlState('left', false), blocks * MOVE_DELAY)
            break
          case 'ileri':
            bot.setControlState('forward', true)
            setTimeout(() => bot.setControlState('forward', false), blocks * MOVE_DELAY)
            break
          case 'geri':
            bot.setControlState('back', true)
            setTimeout(() => bot.setControlState('back', false), blocks * MOVE_DELAY)
            break
          default:
            console.log('Geçersiz yön. Kullanılabilir yönler: --sag, --sol, --ileri, --geri')
        }
        break

      case 'zıpla':
        bot.setControlState('jump', true)
        setTimeout(() => {
          bot.setControlState('jump', false)
        }, JUMP_DELAY)
        break
        
      case 'envanter':
        const inventory = bot.inventory.items()
        console.log('Envanter:')
        inventory.forEach(item => {
          console.log(`${item.name} x${item.count}`)
        })
        break

      default:
        console.log('Mevcut komutlar:')
        console.log('-gel <oyuncu>: Belirtilen oyuncuya git')
        console.log('-takip <oyuncu>: Belirtilen oyuncuyu takip et')
        console.log('-kaz: Bulunduğun yeri kaz')
        console.log('-dans: 10 saniyelik dans gösterisi')
        console.log('-ilerle --yön mesafe: Belirtilen yöne git')
        console.log('  Yönler: --sag, --sol, --ileri, --geri')
        console.log('-zıpla: Zıpla')
        console.log('-envanter: Envanteri göster')
    }
  }

  bot.on('spawn', () => {
    console.log('Bot sunucuya bağlandı!')
    console.log('Chat komutları için mesajınızı yazın:')
    console.log('Çıkmak için "cikis" yazın')
    console.log('Ekran görüntüsü için -foto yazın ve http://localhost:3000 adresini ziyaret edin')
    
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 100)
    }, 1 * 60 * 1000)
  })

  // Chat mesajlarını dinle
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString()
    console.log(`[Chat] ${message}`)
  })

  // Özel mesajları dinle
  bot.on('whisper', (username, message) => {
    console.log(`[Özel Mesaj] ${username}: ${message}`)
  })

  bot.on('error', (err) => {
    console.log('Hata:', err)
  })

  bot.on('kicked', (reason) => {
    console.log('Sunucudan atıldı:', reason)
  })

  bot.on('end', () => {
    if (viewerServer) {
      viewerServer.close()
    }
  })
}

startBot()