<template>
  <svg
    :viewBox="icon.viewBox"
    :style="sizing"
    :class="{ 'app-icon--spin': spin }"
    class="app-icon"
    fill="currentColor"
    focusable="false"
    v-bind="a11y"
  >
    <title v-if="label">{{ label }}</title>
    <path :d="icon.path" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
import { ICONS } from '~/data/icons.generated';

/**
 * Renders one of the icons in data/icons.generated.ts as an inline SVG.
 *
 * Replaces the Font Awesome kit script, which was a third-party origin serving
 * a few hundred KB of JavaScript to draw 21 glyphs. See
 * scripts/generate-icons.mjs for how the path data gets here.
 *
 * Sizing and colour behave like the <i> tags this replaced: the glyph is 1em
 * tall and inherits `currentColor`, so existing rules that set font-size or
 * color on the icon still work. That matters because several call sites style
 * the icon through a scoped class (.social-icon, .icon-feature-icon) — Vue
 * applies a parent's scoped styles to a child component's root element, so
 * those rules land on this <svg>.
 */
const props = defineProps({
  /** Key from data/icons.generated.ts, e.g. 'download'. */
  name: { type: String, required: true },
  /** Continuous rotation, for loading spinners. */
  spin: { type: Boolean, default: false },
  /**
   * Multiplies the inherited font size, replacing Font Awesome's `fa-2x` style
   * classes. A number: 2 renders at twice the surrounding text size.
   */
  scale: { type: Number, default: 1 },
  /**
   * Accessible name. Omit when the icon is decorative or when the surrounding
   * link or button already carries its own label — the icon is then hidden from
   * assistive tech, which is the right result and the default.
   */
  label: { type: String, default: '' },
});

const icon = computed(() => {
  const found = ICONS[props.name];
  if (!found) {
    // Loud in development, harmless in production: a missing icon renders
    // nothing rather than throwing and taking the whole page down.
    if (import.meta.dev) {
      throw new Error(
        `<AppIcon name="${props.name}"> is not a known icon. ` +
          `Add it to ICONS in scripts/generate-icons.mjs and run \`npm run icons\`.`
      );
    }
    return { viewBox: '0 0 0 0', path: '' };
  }
  return found;
});

/**
 * Height is 1em; width follows the icon's own aspect ratio. Forcing both to 1em
 * would letterbox the wider glyphs — champagne-glasses is 640x512 — making them
 * render noticeably smaller than the square ones rather than distorted.
 */
const sizing = computed(() => {
  const [, , width, height] = icon.value.viewBox.split(' ').map(Number);
  const ratio = height ? width / height : 1;
  const em = props.scale;
  return {
    height: `${em}em`,
    width: `${(ratio * em).toFixed(4)}em`,
  };
});

const a11y = computed(() =>
  props.label ? { role: 'img' } : { 'aria-hidden': 'true' }
);
</script>

<style scoped>
.app-icon {
  /* Matches the optical baseline Font Awesome used, so swapping these in did
     not shift any icon sitting inline next to text. */
  vertical-align: -0.125em;
  flex-shrink: 0;
}

.app-icon--spin {
  animation: appIconSpin 1s linear infinite;
}

@keyframes appIconSpin {
  to {
    transform: rotate(360deg);
  }
}
</style>
