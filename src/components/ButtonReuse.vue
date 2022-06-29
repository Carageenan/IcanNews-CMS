<template>
  <button v-on="$listeners" :class="btnType">{{ btnValue }}</button>
</template>

<script>
export default {
  name: "btn",
  data() {
    return {};
  },
  props: ["btnType", "btnValue"],
};
</script>