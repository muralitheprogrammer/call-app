<template>
  <div class="dial-pad" v-if="isVisible" ref="dialPad">
    <h2 class="title">Dialing Pad</h2>
    <div class="display">{{ currentNumber }}</div>
    <div class="buttons">
      <button v-for="num in numbers" :key="num" class="number-button" @click="addNumber(num)">
        {{ num }}
      </button>
      <button class="delete-button" @click="deleteLast">Delete</button>
      <button class="call-button" @click="makeCall">Call</button>
      <button class="clear-button" @click="clear">Clear</button>
    </div>
    <button class="close" @click="close">Close</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      currentNumber: '',
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      isDragging: false,
      offset: { x: 0, y: 0 },
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
      this.currentNumber = '';
    },
    addNumber(num) {
      this.currentNumber += num;
    },
    deleteLast() {
      this.currentNumber = this.currentNumber.slice(0, -1);
    },
    clear() {
      this.currentNumber = '';
    },
    makeCall() {
      this.$emit('call', this.currentNumber);
      this.close();
    },
    handleKeydown(event) {
      const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'];
      if (validKeys.includes(event.key)) {
        this.addNumber(event.key);
      } else if (event.key === 'Backspace') {
        this.deleteLast();
      } else if (event.key === 'Enter') {
        this.makeCall();
      }
    },
  },
};
</script>

<style scoped>
.dial-pad {
  background: linear-gradient(135deg, #f0f4ff, #c9d8ff);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: grab;
}

.title {
  font-size: 26px;
  text-align: center;
  color: #333;
  margin-top: 5px;
  margin-bottom: 10px;
}

.display {
  font-size: 34px;
  margin-bottom: 10px;
  padding: 12px;
  border: 2px solid #007bff;
  border-radius: 8px;
  text-align: right;
  background-color: #ffffff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 40px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.number-button,
.delete-button,
.clear-button,
.call-button {
  padding: 20px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.number-button:hover,
.delete-button:hover,
.clear-button:hover,
.call-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-button {
  background-color: #ff9800;
}

.delete-button:hover {
  background-color: #e68900;
}

.clear-button {
  background-color: #e74c3c;
}

.clear-button:hover {
  background-color: #c0392b;
}

.call-button {
  background-color: #2ecc71;
}

.call-button:hover {
  background-color: #27ae60;
}

.close {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #95a5a6;
  color: white;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
}

.close:hover {
  background-color: #7f8c8d;
  transform: translateY(-2px);
}

/* Responsive styles */
@media (max-width: 480px) {
  .dial-pad {
    max-width: 300px;
    max-height: 450px;
    padding: 15px;
  }

  .title {
    font-size: 22px;
  }

  .display {
    font-size: 28px;
  }

  .number-button,
  .delete-button,
  .clear-button,
  .call-button {
    padding: 16px;
    font-size: 18px;
  }
}
</style>
