<template>
  <div class="v-button">
    <button :class="styles">{{ text }} - {{ count }}</button>
  </div>
</template>

<script>
export default {
  name: "VueButton",
  props: {
    text: {
      type: String,
    },
    styles: {
      type: String,
      default: "btn btn-primary",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>
