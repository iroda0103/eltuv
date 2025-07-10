<!-- <template>
  <div class="menu-item">
    <div class="menu-item__wrapper">
      <div class="item-image">
        <img src="../assets/food.jpeg" alt="Food item" />
      </div>
      <div class="item-info">
        <h3 class="item-name">{{ item.name }}</h3>
        <span class="item-price">{{ formatPrice(item.price) }} SUM</span>
        <p class="item-desc">{{ item.weight }}</p>
      </div>
    </div>
    <div class="add-to-cart">
      <span v-if="quantity > 0" @click="removeToCart(item)"> - </span>
      <span v-if="quantity > 0"> {{ quantity }}</span>
      <span @click="addToCart(item)">+ {{ temporary_name }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    item: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  computed: {
    temporary_name() {
      return this.quantity > 0 ? "" : "Qo'shish";
    }
  },
  methods: {
    addToCart(item) {
      this.$emit("add-to-menu", item);
    },
    removeToCart(item) {
      this.$emit("remove-from-menu", item);
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
};
</script>
<style>
.menu-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
  border-radius: 15px;
  padding: 8px;
  background: #cdcdcd78;
  background-color: var(--bg-container);
  /* max-width: 50%; */
 /* width: 175px;*/
}

.menu-item__wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
  /* margin-top: 8px; */
}

.item-desc {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 8px;
  /* margin-top: 10px; */
}


.item-image {
  border-radius: 15px;
  overflow: hidden;
}

.item-image img {
  max-width: 100%;
  object-fit: cover;
}

.add-to-cart {
  text-decoration: none;
  background-color: var(--card-bg);
  color: var(--text-primary);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;
  border: solid 1.5px var(--border-color);
}

.add-to-cart span {
  flex-grow: 1;
  padding: 8px 9px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.add-to-cart span:nth-child(2) {
  cursor: default;
}
</style> -->
<template>
  <div class="menu-item">
    <div class="menu-item__wrapper" @click="openBottomSheet">
      <div class="item-image">
        <img v-if="item.id === 1" src="../assets/shefburger.jpg" alt="Food item" />
        <img v-if="item.id === 2" src="../assets/mixBurger.jpg" alt="Food item" />
      </div>
      <div class="item-info">
        <h3 class="item-name">{{ item.name }}</h3>
        <span class="item-price">{{ formatPrice(item.price) }} SUM</span>
        <p class="item-desc">{{ item.weight }}</p>
      </div>
    </div>
    <div class="add-to-cart">
      <span v-if="quantity > 0" @click.stop="removeToCart(item)"> - </span>
      <span v-if="quantity > 0"> {{ quantity }}</span>
      <span @click.stop="addToCart(item)">+ {{ temporary_name }} </span>
    </div>

    <!-- Bottom Sheet Modal -->
    <transition name="slide">
      <div v-if="showModal" class="bottom-sheet">
        <div class="bottom-sheet__header" @mousedown="startDrag" @touchstart="startDrag">
          <div class="bottom-sheet__drag-handle"></div>
        </div>
        <div class="bottom-sheet__content">
          <div class="modal-image">
            <img :src="`https://api.suvtekin.uz/${item.image}`" alt="Food item" />
            <!-- <img v-if="item.id === 1" src="../assets/shefburger.jpg" alt="Food item" /> -->
            <!-- <img v-if="item.id === 2" src="../assets/mixBurger.jpg" alt="Food item" /> -->
          </div>
          <!-- <div class="modal-info">
            <h2>{{ item.name }}</h2>
            <p class="modal-price">{{ formatPrice(item.price) }} SUM</p>
            <p class="modal-weight">{{ item.weight }}</p>
            <p v-if="item.description" class="modal-description">{{ item.description }}</p>
            <p v-else class="modal-description">Tafsilotlar mavjud emas</p>
            
            <div class="modal-actions">
              <button @click.stop="removeToCart(item)">-</button>
              <span>{{ quantity }}</span>
              <button @click.stop="addToCart(item)">+</button>
            </div>
          </div> -->
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <span class="item-price">{{ formatPrice(item.price) }} SUM</span>
            <p class="item-desc">{{ item.weight }}</p>
          </div>
          <div class="modal-actions">
            <div class="add-to-cart">
              <span v-if="quantity > 0" @click.stop="removeToCart(item)"> - </span>
              <span v-if="quantity > 0"> {{ quantity }}</span>
              <span @click.stop="addToCart(item)">+ {{ temporary_name }} </span>
            </div>
            <button>Qo'shimchalar</button>
          </div>

        </div>
      </div>
    </transition>
    <div v-if="showModal" class="bottom-sheet__backdrop" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    item: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showModal: false,
      startY: 0,
      currentY: 0,
      isDragging: false
    }
  },
  computed: {
    temporary_name() {
      return this.quantity > 0 ? "" : "Qo'shish";
    }
  },
  methods: {
    addToCart(item) {
      this.$emit("add-to-menu", item);
    },
    removeToCart(item) {
      this.$emit("remove-from-menu", item);
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    openBottomSheet() {
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = '';
    },
    startDrag(e) {
      this.isDragging = true;
      this.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag, { passive: false });
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchend', this.endDrag);
    },
    onDrag(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      const deltaY = y - this.startY;

      if (deltaY > 0) {
        this.currentY = deltaY;
      }
    },
    endDrag() {
      if (this.currentY > 100) {
        this.closeModal();
      }
      this.isDragging = false;
      this.currentY = 0;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchend', this.endDrag);
    }
  },
  watch: {
    showModal(val) {
      if (val) {
        this.currentY = 0;
      }
    }
  }
};
</script>

<style>
.menu-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
  border-radius: 15px;
  padding: 8px;
  background: #cdcdcd78;
  background-color: var(--bg-container);
}

.menu-item__wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 8px;
}

.item-image {
  border-radius: 15px;
  overflow: hidden;
}

.item-image img {
  max-width: 100%;
  object-fit: cover;
  height: 120px;
  width: 100%;
}

.add-to-cart {
  text-decoration: none;
  background-color: var(--card-bg);
  color: var(--text-primary);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;
  border: solid 1.5px var(--border-color);
}

.add-to-cart span {
  flex-grow: 1;
  padding: 8px 9px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.add-to-cart span:nth-child(2) {
  cursor: default;
}

/* Bottom Sheet Styles */
.bottom-sheet {
  position: fixed;
  left: 0;
  top: 100px;
  ;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  max-height: 90vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.bottom-sheet__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.bottom-sheet__header {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  user-select: none;
  touch-action: none;
}

.bottom-sheet__drag-handle {
  width: 40px;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
}

.bottom-sheet__content {
  padding: 0 16px 16px;
}

.modal-image img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  max-height: 200px;
  object-fit: cover;
}

.modal-info h2 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.modal-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.modal-weight {
  color: #777;
  margin-bottom: 15px;
}

.modal-description {
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 50px;
  gap: 30px;
  width: calc(100% - 40px);
}

.modal-actions .add-to-cart {
  min-width: 170px;
}

.modal-actions button {
  padding: 8px 15px;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 15px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1.5px var(--border-color);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>