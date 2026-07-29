/**
 * Thin client for the Lambda API behind api.chrispecmusic.com.
 *
 * Exists for two reasons. The base URL was hardcoded in three separate
 * components, so there was no way to point a build at anything else. And every
 * caller had to repeat the same unwrapping dance, because the Lambdas return
 * their payload as a JSON-encoded *string* body while $fetch already parses
 * JSON responses — so a caller can receive either a string or an object
 * depending on how API Gateway is configured on any given route.
 *
 * The unwrapping belongs here rather than in each component. The real fix is
 * for the Lambdas to return proper JSON, at which point `unwrap` becomes a
 * no-op and can be deleted from one place instead of three.
 */

type Query = Record<string, string | undefined | null>;

/** Handles the string-or-object ambiguity described above. */
function unwrap<T>(response: unknown): T {
  return (typeof response === 'string' ? JSON.parse(response) : response) as T;
}

/**
 * Undefined, null and empty values are dropped rather than serialised as the
 * string "undefined".
 */
function buildQuery(query: Query): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') params.append(key, value);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function useApi() {
  const base = useRuntimeConfig().public.apiBase;

  return {
    /** GET a route, e.g. get('/events', { timeMin }). */
    async get<T>(path: string, query: Query = {}): Promise<T> {
      return unwrap<T>(await $fetch(`${base}${path}${buildQuery(query)}`));
    },

    async post<T>(path: string, body: unknown): Promise<T> {
      return unwrap<T>(
        await $fetch(`${base}${path}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    },
  };
}
