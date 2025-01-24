# 🤖 Minecraft AFK Bot

Minecraft sunucularında kullanılabilen çok amaçlı bot.
Bu botu Aternos sunucularınızda afk bırakmak için de kullanabilirsiniz.

## 📌 Özellikler

- ⚡ Otomatik AFK kalma
- 🎯 Oyuncu takibi
- ⛏️ Yeri Kazma
- 🎮 Yön kontrolü
- 📦 Envanter yönetimi

## 🛠️ Gereksinimler

- Node.js (v14+)
- npm
- Minecraft Java Edition (1.8 - 1.21.x)

## ⚙️ Kurulum

### Linux

```bash
# Repoyu klonla
git clone https://github.com/quirxsama/mcafkbot.git

# Proje dizinine git
cd mcafkbot

# Bağımlılıkları yükle
npm install

# Botu başlat
node bot.js
```

### Windows

1. Node.js'i [resmi sitesinden](https://nodejs.org/) indirin ve kurun
2. GitHub'dan projeyi ZIP olarak indirin
3. İndirilen ZIP'i çıkartın
4. Komut istemini (cmd) yönetici olarak çalıştırın
5. Çıkartılan klasöre gidin:
```cmd
cd C:\...\mcafkbot
```
6. Bağımlılıkları yükleyin:
```cmd
npm install
```
7. Botu başlatın:
```cmd
node bot.js
```

## 🎮 Kullanım

```bash
# Botu başlat
node bot.js
```

### 📝 Komutlar

| Komut | Açıklama |
|-------|-----------|
| `-gel <oyuncu>` | Belirtilen oyuncuya git |
| `-takip <oyuncu>` | Oyuncuyu takip et |
| `-kaz` | Bulunduğun yeri kaz |
| `-dans` | Dans gösterisi yap |
| `-ilerle --yön <mesafe>` | Belirtilen yöne git |
| `-zıpla` | Zıpla |
| `-envanter` | Envanteri göster |

### 🎯 Yön Parametreleri

- `--sag`: Sağa hareket
- `--sol`: Sola hareket
- `--ileri`: İleri git
- `--geri`: Geri git

## ⚠️ Uyarılar

- Bot eğitim amaçlıdır
- Sunucu kurallarını ihlal etmeyecek şekilde kullanın
- Hassas bilgiler `last_config.json` dosyasında saklanır

## 📄 Lisans

MIT

# English

# 🤖 Minecraft AFK Bot

A multipurpose bot for Minecraft servers.

## 📌 Features

- ⚡ Automatic AFK
- 🎯 Player tracking
- ⛏️ Mining
- 🎮 Directional control
- 📦 Inventory management

## 🛠️ Requirements

- Node.js (v14+)
- npm
- Minecraft Java Edition (1.8 - 1.21.x)

## ⚙️ Installation

### Linux

```bash
# Clone the repo
git clone https://github.com/quirxsama/mcafkbot.git

# Go to project directory
cd mcafkbot

# Install dependencies
npm install

# Start the bot
node bot.js
```

### Windows

1. Download and install Node.js from [official website](https://nodejs.org/)
2. Download project as ZIP from GitHub
3. Extract the ZIP file
4. Run Command Prompt (cmd) as administrator
5. Navigate to extracted folder:
```cmd
cd C:\...\mcafkbot
```
6. Install dependencies:
```cmd
npm install
```
7. Start the bot:
```cmd
node bot.js
```

## 🎮 Usage

```bash
# Start the bot
node bot.js
```

### 📝 Commands

| Command | Description |
|---------|-------------|
| `-gel <player>` | Go to specified player |
| `-takip <player>` | Follow the player |
| `-kaz` | Mine at current position |
| `-dans` | Perform dance moves |
| `-ilerle --direction <distance>` | Move in specified direction |
| `-zipla` | Jump |
| `-envanter` | Show inventory |

### 🎯 Direction Parameters

- `--sag`: Move right
- `--sol`: Move left
- `--ileri`: Move forward
- `--geri`: Move backward

## ⚠️ Warnings

- Bot is for educational purposes
- Use in compliance with server rules
- Sensitive information is stored in `last_config.json`

## 📄 License

MIT
