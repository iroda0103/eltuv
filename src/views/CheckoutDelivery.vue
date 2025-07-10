<template>
  <div class="checkout-container">
    <div class="header">
      <h2 class="title">Buyurtma turi</h2>
    </div>

    <div class="section delivery-type">
      <h3 class="section-title">Buyurtma usuli</h3>
      <div class="options">
        <div :class="'option ' + (isDelivery ? 'selected' : '')" @click="changeDeliveryType('delivery')">
          <div class="option-content">
            <span class="option-title">Yetkazib berish</span>
            <span class="option-duration">25-35 daqiqa</span>
          </div>
          <span class="option-price">10,000 so'm</span>
        </div>
        <div :class="'option ' + (!isDelivery ? 'selected' : '')" @click="changeDeliveryType('pickup')">
          <div class="option-content">
            <span class="option-title">O'zim olib ketaman</span>
            <span class="option-duration">Tayyor bo'lganda</span>
          </div>
          <span class="option-price">Bepul</span>
        </div>
      </div>
    </div>

    <!-- Manzil -->
    <div class="section address-section">
      <div class="section-header">
        <h3 class="section-title">Yetkazish manzili</h3>
        <button class="edit-btn">O'zgartirish</button>
      </div>

      <div class="address-card">
        <div class="address-main">
          <label>Manzil</label>
          <!-- <i class="icon">📍</i> -->
          <!-- <p>{{ address.full }}</p> -->
          <input v-model="userStore.user.address" type="text" placeholder="Masalan, uy orqasidagi eshikdan kiring"
            class="form-input">
          <!-- <p>{{ userStore.user?.address }}</p> -->
        </div>

        <!-- <div class="form-grid">
          <div class="form-group">
            <label>Pod'yezd</label>
            <input v-model="address.entrance" type="text" placeholder="1" class="form-input" />
          </div>
          <div class="form-group">
            <label>Domofon</label>
            <input v-model="address.domofon" type="text" placeholder="1234" class="form-input" />
          </div>
          <div class="form-group">
            <label>Kvartira</label>
            <input v-model="address.flat" type="text" placeholder="42" class="form-input" />
          </div>
          <div class="form-group">
            <label>Qavat</label>
            <input v-model="address.floor" type="text" placeholder="3" class="form-input" />
          </div>
        </div> -->

        <div class="form-group">
          <label>Kur'yer uchun izoh</label>
          <input v-model="address.note" type="text" placeholder="Masalan, uy orqasidagi eshikdan kiring"
            class="form-input" />
        </div>

        <div class="form-group">
          <label>Telefon raqam</label>
          <input v-model="address.phone" type="tel" placeholder="+998 __ ___ __ __" class="form-input" />
        </div>
      </div>
    </div>

    <!-- To'lov -->
    <div class="section payment-section">
      <h3 class="section-title">To'lov usuli</h3>

      <div class="payment-notice">
        <i class="notice-icon">ℹ️</i>
        <p>Naqd pulda to'lov qilmoqchi bo'lsangiz, buyurtma tafsilotlarini diqqat bilan tekshiring.</p>
      </div>

      <div class="payment-options">
        <button :class="{ 'payment-option': true, 'selected': paymentMethod === 'card' }" disabled
          @click="paymentMethod = 'card'">
          <span class="payment-icon">💳</span>
          <span class="payment-text">Karta orqali to'lash</span>
          <span class="payment-arrow">›</span>
        </button>
        <button :class="{ 'payment-option': true, 'selected': paymentMethod === 'cash' }"
          @click="paymentMethod = 'cash'">
          <span class="payment-icon">💵</span>
          <span class="payment-text">Naqd pul bilan to'lash</span>
          <span class="payment-arrow">›</span>
        </button>
      </div>
    </div>

    <!-- Jami va To'lash -->
    <div class="summary-section">
      <div class="summary-details">
        <div class="summary-row">
          <span>Mahsulotlar</span>
          <!-- <span>{{ formatPrice(total - 10000) }} {{ menuStore.totalPrice }} so'm</span> -->
          <span>{{ menuStore.totalPrice }} so'm</span>
        </div>
        <div class="summary-row">
          <span>Yetkazish xizmati</span>
          <span>{{ formatPrice(deliveryPrice) }} so'm</span>
        </div>
        <div class="summary-row total">
          <span>Jami</span>
          <span class="total-price">{{ formatPrice(menuStore.totalPrice + deliveryPrice) }} so'm</span>
        </div>
      </div>
      <button class="pay-btn" @click="order">Buyurtma berish</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '../store/menu.store'
import { useUserStore } from '../store/user.store'
import { useOrderStore } from '../store/order.store'

const address = ref({
  full: 'Gulobod dahasi, uy 97',
  entrance: '3',
  domofon: '',
  flat: '23',
  floor: '2',
  note: '',
  phone: '+998881113821',
})


const paymentMethod = ref('cash')
const deliveryPrice = ref(10000)
const isDelivery = ref(true)
const menuStore = useMenuStore()
const userStore = useUserStore()
const orderStore = useOrderStore()
if (userStore.user.phone) {
  address.value.phone = '+998' + userStore.user.phone
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const changeDeliveryType = (type) => {
  isDelivery.value = (type === 'delivery')
  if (type === 'pickup') {
    deliveryPrice.value = 0
  } else {
    deliveryPrice.value = 10000
  }
}
console.log(orderStore);


const order = async () => {
  try {
    const order = await orderStore.createOrder({
      address: userStore.user?.address,
      driverId: 9,
      clientId: userStore.user.id,
      restaurantId: menuStore.restaurant?.id,
      items: menuStore.menu.map(item => ({
        menuId: item.id,
        quantity: item.quantity
      })),
      paymentMethod: paymentMethod.value,
      deliveryMethod: isDelivery.value ? 'delivery' : 'pickup'
    })
    
    window.Telegram.WebApp.sendData(JSON.stringify({
      id: order.id,
      address: address.value,
      paymentMethod: paymentMethod.value,
      totalPrice: menuStore.totalPrice + deliveryPrice.value,
      items: menuStore.menu.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price
      })),
      deliveryFree: deliveryPrice.value,
      user: {
        id: userStore.user.id,
        name: userStore.user.name,
        phone: userStore.user.phone,
        address: userStore.user.address
      }
    }))
  } catch (error) {
    console.log('Nimadir xato ketdi', error)
  }

  window.Telegram.WebApp.close()
  console.log('Buyurtma muvaffaqiyatli yaratildi!')

}
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  color: #333;
  /* background-color: #f8f8f8; */
}

.header {
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #222;
}

.progress-steps {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.step {
  padding: 4px 8px;
  border-radius: 4px;
}

.step.active {
  background-color: #f0f0f0;
  font-weight: 500;
  color: #222;
}

.divider {
  color: #999;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.edit-btn {
  background: none;
  border: none;
  color: #FFA500;
  /* Sariq rang */
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

/* Buyurtma turi */
.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  border-color: #ccc;
}

.option.selected {
  border-color: #FFA500;
  /* Sariq rang */
  background-color: #FFF9E6;
}

.option-content {
  display: flex;
  flex-direction: column;
}

.option-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.option-duration {
  font-size: 13px;
  color: #666;
}

.option-price {
  font-weight: 600;
}

/* Manzil */
.address-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 16px;
}

.address-main {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.address-main p {
  margin: 0;
  line-height: 1.4;
}

.icon {
  font-size: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: border 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
  /* Yashil rang */
}

.form-input::placeholder {
  color: #aaa;
}

/* To'lov */
.payment-notice {
  display: flex;
  gap: 10px;
  background: #FFF9E6;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

.notice-icon {
  font-size: 18px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-option:hover {
  border-color: #ccc;
}

.payment-option.selected {
  border-color: #FFA500;
  /* Sariq rang */
  background-color: #FFF9E6;
}

.payment-icon {
  font-size: 24px;
  margin-right: 12px;
}

.payment-text {
  flex: 1;
  text-align: left;
  font-weight: 500;
}

.payment-arrow {
  color: #999;
  font-size: 20px;
}

/* Summary */
.summary-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  bottom: 20px;
}

.summary-details {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #555;
}

.summary-row.total {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  font-size: 17px;
  font-weight: 600;
  color: #222;
}

.total-price {
  color: #4CAF50;
  /* Yashil rang */
}

.pay-btn {
  width: 100%;
  background: #FFA500;
  /* Sariq rang */
  color: #222;
  /* Qora rang */
  border: none;
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.pay-btn:hover {
  background: #E69500;
}

/* @media (max-width: 480px) {
  .checkout-container {
    padding: 16px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
} */
</style>