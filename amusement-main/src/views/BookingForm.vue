<template>
  <div class="home">
    <Booking />
  </div>
</template>

<script>
// @ is an alias to /src
import Booking from '@/components/Booking.vue'

export default {
  name: 'BookingForm',
  components: {
    Booking
  }
}
</script>