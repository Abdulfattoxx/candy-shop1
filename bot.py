from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# <<<< BOT TOKENINGIZNI SHU YERGA QO'YING >>>>
BOT_TOKEN = "8360792713:AAGkklwPNhkUBjCYtqnKLrqZfmWrsHYluVk"

# Mini App link – bu sizning Vercel yoki Netlify URL’ingiz bo'lishi kerak
MINI_APP_URL = "https://candy-shop1-gamma.vercel.app/"

# /start komandasi uchun handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    name = user.first_name or "foydalanuvchi"

    welcome_text = (
        f"👋 Salom, {name}!\n\n"
        f"🍭 CandyShop Mini App'ga xush kelibsiz!\n"
        f"🚀 Pastdagi tugmani bosib ilovani ishga tushiring!"
    )

    # Inline Web App tugmasi
    keyboard = [
        [InlineKeyboardButton("🚀 CandyShop'ni ochish", web_app={"url": MINI_APP_URL})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(welcome_text, reply_markup=reply_markup)

# Botni ishga tushirish
def main():
    application = Application.builder().token(BOT_TOKEN).build()

    # /start komandasi handler
    application.add_handler(CommandHandler("start", start))

    print("✅ Bot ishga tushdi. Telegramda tekshirishingiz mumkin.")
    application.run_polling()

if __name__ == "__main__":
    main()
