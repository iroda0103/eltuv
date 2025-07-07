const { Telegraf, Markup } = require('telegraf');
// const config = require("./config");
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend manzilingiz
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

// 🧠 Socket ma'lumotlarini saqlash
const drivers = new Map(); // socket.id => { cityId, userId }

// 🔌 Socket ulanish
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('registerDriver', ({ cityId, userId }) => {
    console.log('Driver registered:', userId, 'in city:', cityId);
    drivers.set(socket.id, { cityId, userId });
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket disconnected:', socket.id);
    drivers.delete(socket.id);
  });
});

app.post('/orders/created-order', cors(), async (req, res) => {
  try {
    console.log("Received data:", req.body);
    res.send(res.body);
  } catch (error) {
    console.error("Error in /orders/created-order:", error);
    res.status(500).json({ error: 'Server error' });
  }
});
const bot = new Telegraf('8191500231:AAG8IxtNqCtUyDeb1PEBinO6_fBz2E22JE8');

bot.catch((err, ctx) => {
  console.error(`Error for user ${ctx.from?.id}:`, err);
});
console.log("Bot is starting...");

//start komandasi
bot.start(async (ctx) => {
  const telegramUser = ctx.from;
  console.log(telegramUser.id);

  ctx.reply(
    `👋 Assalomu alaykum, hurmatli mijoz!

🍽 Bizning xizmat orqali shahar va tumanlardagi eng yaxshi restoranlardan tez va qulay tarzda ovqat buyurtma qilishingiz mumkin.

📲 Davom etish uchun, iltimos telefon raqamingizni yuboring:`,
    Markup.keyboard([
      Markup.button.contactRequest('📱 Telefon raqamni yuborish')
    ])
      .oneTime()
      .resize()
  );
  // const keyboard = Markup.keyboard([
  //   ['📋 Mening buyurtmalarim', '☎️ Qo‘llab-quvvatlash'],
  //   [Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')]
  // ]).resize();

  // await ctx.reply(
  //   `Salom ${telegramUser.first_name}! 🍕\n\nOvqat yetkazib berish xizmatimizga xush kelibsiz!\n\nQuyidagi tugmalardan birini tanlang:`,
  //   keyboard
  // );
});

bot.on('contact', async (ctx) => {
  try {
    const contact = ctx.message.contact;
    const phone = contact.phone_number;
    const firstName = contact.first_name || 'Foydalanuvchi';
    const data = {
      "phone": phone.slice(4),
      "password": phone.slice(4), // vaqtincha, foydalanuvchi keyin o‘zgartiradi
      "name": firstName,
      "role": "client",
      "telegramId": String(ctx.from.id),
    }

    const response = await axios.post('http://localhost:3002/auth/register', data);
    console.log(`User registered: ${response}`);

    if (response.data) {
      await ctx.reply('✅ Ro‘yxatdan muvaffaqiyatli o‘tdingiz!');

      const keyboard = Markup.keyboard([
        ['🧾 Mening buyurtmalarim', '☎️ Qo‘llab-quvvatlash'],
        ['🍽 Taom buyurtma qilish']
        // [Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')]
      ]).resize();

      await ctx.reply(
        `🚀 Endi siz xizmatimizdan to‘liq foydalanishingiz mumkin. Quyidagi menyudan tanlang:`,
        keyboard
      );

    } else {
      await ctx.reply('❌ Ro‘yxatdan o‘tishda noma’lum xatolik yuz berdi.');
    }

  } catch (error) {
    if (error.response?.data.message == 'User already exists') {
      await ctx.reply('ℹ️ Siz allaqachon ro‘yxatdan o‘tgansiz.');

      const keyboard = Markup.keyboard([
        ['🧾 Mening buyurtmalarim', '☎️ Qo‘llab-quvvatlash'],
        // ['🍽 Taom buyurtma qilish']
        [Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')]
      ]).resize();

      await ctx.reply(
        `👋 Yana bir bor xush kelibsiz! Quyidagi menyudan foydalanishingiz mumkin:`,
        keyboard
      );
    }
    else {
      await ctx.reply('❌ Server bilan bog‘lanishda muammo yuz berdi. Iltimos, birozdan so‘ng urinib ko‘ring.');
    }
  }
});

bot.command('all', (ctx) => {

  Markup.button.webApp('🛍 Buyurtma berish', 'https://eltuv.vercel.app/')
  ctx.reply('Ovqat buyurtma qiladigan botga cush kelibsiz!', Markup.keyboard([
    [Markup.button.webApp('🛍 Buyurtma berish', 'https://eltuv.vercel.app/')]
  ]).resize());
});

bot.hears('🧾 Mening buyurtmalarim', async (ctx) => {
  const orders = [
    {
      orderId: 'A1234',
      status: 'confirmed',
      restaurantName: 'Pishloqli Pizza',
      totalAmount: 85000,
      orderDate: new Date('2025-06-01'),
      items: [
        { name: 'Pishloqli pizza', quantity: 1, price: 50000 },
        { name: 'Coca-Cola 1.5L', quantity: 2, price: 17500 }
      ]
    },
    {
      orderId: 'B5678',
      status: 'delivering',
      restaurantName: 'Shashlik House',
      totalAmount: 120000,
      orderDate: new Date('2025-05-28'),
      items: [
        { name: 'Mol go‘shti shashlik', quantity: 2, price: 40000 },
        { name: 'Non', quantity: 2, price: 10000 },
        { name: 'Choy', quantity: 1, price: 20000 }
      ]
    }
  ];

  const statusEmoji = {
    'pending': '⏳',
    'confirmed': '✅',
    'preparing': '👨‍🍳',
    'ready': '🍽',
    'delivering': '🚚',
    'delivered': '✅',
    'cancelled': '❌'
  };

  let message = '📋 Sizning buyurtmalaringiz:\n\n';

  orders.forEach((order, index) => {
    message += `${index + 1}. Buyurtma #${order.orderId}\n`;
    message += `${statusEmoji[order.status]} Status: ${order.status}\n`;
    message += `🏪 Restoran: ${order.restaurantName}\n`;
    message += `📅 Sana: ${order.orderDate.toLocaleDateString()}\n`;
    message += `🍽 Taomlar:\n`;

    order.items.forEach((item) => {
      message += `  • ${item.quantity} ta ${item.name}  — ${(item.price * item.quantity).toLocaleString()} so'm\n`;
    });

    message += `💰 Umumiy: ${order.totalAmount.toLocaleString()} so'm\n\n`;
  });

  await ctx.reply(message);
});

bot.command('address', async (ctx) => {
  ctx.reply('🍽 Taom buyurtma qilish uchun manzilingizni yuboring:', {
    reply_markup: {
      keyboard: [
        [{ text: 'Lokatsiyani yuborish', request_location: true }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
})

// 1. Boshlanish
bot.command('location', (ctx) => {
  ctx.reply('📍 Manzilingizni yuboring:', {
    reply_markup: {
      keyboard: [
        [{ text: 'Lokatsiyani yuborish', request_location: true }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

// 2. Lokatsiyani qabul qilish
bot.on('location', (ctx) => {
  const location = ctx.message.location;
  // Lokatsiyani saqlab qo‘yish
  ctx.reply('✅ Manzilingiz saqlandi. Endi taom tanlang!', Markup.inlineKeyboard([
    Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')
  ]));
  // Davom ettirish: menyuni ko‘rsatish
});


// Foydalanuvchi yuborgan xabarlarni qayta ishlash
async function startBot() {
  try {
    await bot.launch();
    console.log("🤖 Bot ishga tushdi");

    // Setup graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error("❌ Bot ishga tushirishda xatolik:", error);
    process.exit(1);
  }
}

// Botni ishga tushirish
startBot().catch(console.error);



const PORT = 3030;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
