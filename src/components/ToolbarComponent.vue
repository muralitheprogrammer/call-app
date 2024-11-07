<template>
  <div class="toolbar">
    <button @click="receiveCall">Receive Call</button>
    <button @click="showDialPad">Dial Call</button>
    <button @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
    <button @click="togglePause">{{ isPaused ? 'Continue' : 'Pause' }}</button>
    <DialPad ref="dialPad" @call="dialCall" />
  </div>
</template>

<script>
import axios from 'axios';
import * as Twilio from '@twilio/voice-sdk';
import { HubConnectionBuilder } from '@microsoft/signalr';
import DialPad from './DialPad.vue';
import { useToast } from "vue-toastification";

axios.defaults.baseURL = 'https://localhost:7093/api'; // Your .NET backend API base URL

export default {
  components: {
    DialPad,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      twilioDevice: null,
      isMuted: false,
      isPaused: false,
      activeCall: null,
      hubConnection: null,
    };
  },
  methods: {
    async initializeTwilio() {
      try {
        const response = await axios.post('/calls/get-token');
        const token = response.data.token;

        this.twilioDevice = new Twilio.Device(token);

        this.toast.success('Twilio device initialized');
      } catch (error) {
        console.error('Failed to initialize Twilio:', error);
      }
    },
    async acceptCall() {
      try {
        await axios.post('/calls/accept-call');
        this.toast.success('Call accepted');
      } catch (error) {
        this.toast.error('Failed to accept call: ' + error.message);
      }
    },
    rejectCall() {
      this.toast.info('Call declined');
    },
    receiveCall() {
      if (this.activeCall) {
        this.activeCall.accept();
        this.toast.success('Call accepted');
      } else {
        this.toast.error('No incoming call to receive');
      }
    },
    showDialPad() {
      this.$refs.dialPad.open();
    },
    async dialCall(phoneNumber) {
      try {
        if (phoneNumber) {
          const callRequest = {
            toPhoneNumber: `+91${phoneNumber}`,
            voiceUrl: 'http://demo.twilio.com/docs/voice.xml', // Example voice URL
          };

          await axios.post('/calls/make-call', callRequest);
          this.toast.success(`Call sent to ${phoneNumber}`);
        }
      } catch (error) {
        this.toast.error(`Error making call: ${error.message}`);
      }
    },
    toggleMute() {
      if (this.activeCall) {
        this.isMuted = !this.isMuted;
        this.activeCall.mute(this.isMuted);
      }
    },
    togglePause() {
      if (this.activeCall) {
        this.isPaused = !this.isPaused;
      }
    },
    initializeSignalR() {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7093/callHub')
        .build();

      this.hubConnection.on('IncomingCall', (message) => {
        console.log('Incoming call message from backend:', message);
        const callerInfo = message.From || 'Unknown caller';
        const userConfirmed = confirm(`Incoming call from: ${callerInfo}. Do you want to accept?`);
        if (userConfirmed) {
          this.acceptCall();
        } else {
          this.rejectCall();
        }
      });

      this.hubConnection
        .start()
        .then(() => console.log('SignalR connection established'))
        .catch((err) => console.error('Error establishing SignalR connection:', err));
    },
  },
  mounted() {
    this.initializeTwilio();
    this.initializeSignalR();
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
