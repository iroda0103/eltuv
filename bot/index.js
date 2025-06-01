const { Telegraf, Markup } = require('telegraf');
// const config = require("./config");
const axios = require('axios');

const bot = new Telegraf('8191500231:AAG8IxtNqCtUyDeb1PEBinO6_fBz2E22JE8');

bot.catch((err, ctx) => {
  console.error(`Error for user ${ctx.from?.id}:`, err);
});

//start komandasi
bot.start((ctx) => {
  ctx.reply(
    'Ro‘yxatdan o‘tish uchun telefon raqamingizni yuboring:',
    Markup.keyboard([
      Markup.button.contactRequest('📱 Telefon raqamni yuborish')
    ])
      .oneTime()
      .resize()
  );
});

// Telefon raqam qabul qilish
bot.on('contact', async (ctx) => {
  const contact = ctx.message.contact;
  const phone = contact.phone_number;
  const firstName = contact.first_name || 'Foydalanuvchi';

  try {
    const response = await axios.post('http://localhost:3002/auth/register', {
      phone: phone,
      password: phone,
      name: firstName,
      role: 'client'
    });

    console.log('API Response:', response.data);

    if (response.data.success) {
      ctx.reply('✅ Ro‘yxatdan muvaffaqiyatli o‘tdingiz!');
    } else if (typeof response.data === 'string' && response.data.includes('User already exists')) {
      ctx.reply('ℹ️ Siz allaqachon ro‘yxatdan o‘tgansiz.');
    } else if (Array.isArray(response.data)) {
      ctx.reply('ℹ️ Siz allaqachon ro‘yxatdan o‘tgansiz.');
    } else {
      ctx.reply('❌ Ro‘yxatdan o‘tishda noma’lum xatolik yuz berdi.');
    }

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    ctx.reply('❌ Server bilan bog‘lanishda muammo yuz berdi.');
  }
});

bot.command('all', (ctx) => {

    Markup.button.webApp('🛍 Buyurtma berish', 'https://eltuv.vercel.app/')
   ctx.reply('Welcome to Durger King!', Markup.keyboard([
    [Markup.button.webApp('🛍 Buyurtma berish', 'https://eltuv.vercel.app/')]
  ]).resize());
});
console.log("Bot is ready to receive messages sdsdsd!");


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

