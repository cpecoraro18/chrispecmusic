<template>
  <div>
    <!-- Pills on desktop. Below lg they wrap into an unreadable block once
         there are more than a handful, so small screens get a select instead. -->
    <div class="d-none d-lg-block">
      <div class="filter-row" role="group" :aria-label="label">
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="btn filter-pill"
          :class="modelValue === option.value ? 'filter-pill--active' : ''"
          :aria-pressed="modelValue === option.value"
          @click="$emit('update:modelValue', option.value)"
        >
          {{ option.label }} <span class="filter-count">{{ option.count }}</span>
        </button>
      </div>
    </div>

    <div class="d-lg-none mx-auto filter-select-wrap">
      <label :for="selectId" class="form-label visually-hidden">{{ label }}</label>
      <select
        :id="selectId"
        class="form-select"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }} ({{ option.count }})
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
/**
 * Filter control shared by /gear and /portfolio.
 *
 * /gear already had the pills-plus-select pattern and /portfolio had pills
 * only, so the same control behaved differently on mobile depending on which
 * page you were on. Options come from useFilter so the counts cannot disagree
 * with what is rendered.
 */
defineProps({
  /** The selected value; '' means no filter. Use with v-model. */
  modelValue: { type: String, required: true },
  /** From useFilter: [{ value, label, count }]. */
  options: { type: Array, required: true },
  /** Accessible name for the group, e.g. 'Filter gear by type'. */
  label: { type: String, required: true },
  /** Must be unique per page — it is the select's id. */
  selectId: { type: String, default: 'filter-select' },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.filter-select-wrap {
  max-width: 20rem;
}
</style>
