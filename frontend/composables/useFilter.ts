import { computed, ref, type Ref } from 'vue';

export interface FilterOption {
  /** The value to match against, or '' for "everything". */
  value: string;
  label: string;
  count: number;
}

/**
 * Derives a set of filter options from a list and filters that list by one of
 * them.
 *
 * /gear and /portfolio each grew their own copy of this: build the distinct
 * values, count how many items are in each, filter on the selected one. The two
 * copies had already diverged — gear used '' for "all" and portfolio used the
 * string 'all' — which is the kind of difference that makes a shared component
 * impossible until someone reconciles it.
 *
 * @param items  The full list.
 * @param key    Which field to group by.
 * @param allLabel  Label for the "no filter" option.
 */
export function useFilter<T>(items: Ref<T[]> | T[], key: keyof T, allLabel = 'All') {
  const list = computed(() => (Array.isArray(items) ? items : items.value));

  /** '' means no filter. */
  const selected = ref('');

  const options = computed<FilterOption[]>(() => {
    const counts = new Map<string, number>();
    for (const item of list.value) {
      const value = String(item[key]);
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    return [
      { value: '', label: allLabel, count: list.value.length },
      ...[...counts.keys()]
        .sort()
        .map((value) => ({ value, label: value, count: counts.get(value)! })),
    ];
  });

  const filtered = computed(() =>
    selected.value ? list.value.filter((item) => String(item[key]) === selected.value) : list.value
  );

  return { selected, options, filtered };
}
