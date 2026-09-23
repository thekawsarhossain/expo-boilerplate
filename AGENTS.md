# Agent instructions

Expo SDK 54 / React Native 0.81 app. TypeScript strict, Expo Router, TanStack Query v5 (persisted to SQLite), axios, zustand + MMKV, NativeWind v4, FlashList v2. `README.md` is the full human guide; this file is the short version you must follow.

## Priorities

When rules pull in different directions, choose in this order: **security, then performance, then everything else** (brevity, convenience, cleverness).

## Before you write code

- Read the nearest existing example of what you're building and copy its pattern: `features/characters/api/get-characters.ts` for API calls, `app/(tabs)/index.tsx` for a screen, `components/screens/characters/` for sub-components and skeletons.
- If a file doesn't clearly fit a folder below, ask. Don't invent a new top-level folder.
- Propose moves or renames of existing files before running them.

## Where code goes

| Code | Location |
|---|---|
| Screen (state, hooks, layout) | route file in `app/`. The route file IS the screen |
| Sub-component of a screen | `components/screens/<screen>/` |
| Sub-component another screen also uses | stays under its owning screen; other screens import it from there |
| Generic, domain-free component | `components/shared/` |
| Styled design-system component | `components/ui/` |
| Unstyled behavior/accessibility primitive | `components/primitives/` |
| Skeleton | `<Component>Skeleton.tsx` next to the component it mirrors, built from `components/ui/skeleton` |
| API call | `features/<feature>/api/<verb>-<resource>.ts` |
| Query keys | `features/<feature>/api/keys.ts` |
| Domain types / constants | `features/<feature>/types.ts` / `constants.ts` |
| Client-only persisted state | `features/<feature>/store.ts` (zustand + `zustandStorage`) |
| Feature public API | `features/<feature>/index.ts` |
| Generic hook | `hooks/` |
| Pure helper | `lib/utils/` (re-export from `lib/utils/index.ts`) |
| App-wide constant | `constants/` |
| Cross-feature type | `types/` |
| Env var access | `config/env.ts` only |

Hard rules:

- Never put a component whose only job is to wrap a whole screen in `components/screens/`.
- Never put domain-aware components (anything that knows about characters, users, orders...) in `components/shared/`, even when two screens use them.
- Never put components in `features/`.
- Nothing lives directly in `components/`.

## Data

- Server data lives only in TanStack Query. Never copy it into zustand or `useState`.
- Each API file exports, in order: fetcher `getX(..., signal?)` using `httpClient`, `getXQueryOptions(...)` built with `queryOptions` / `infiniteQueryOptions` and keys from `keys.ts`, then hook `useX`.
- Components only use `useX` hooks imported from `@/features/<feature>`. They never import `httpClient`, axios or a fetcher.
- Mutations: `useMutation` in the feature's api file; invalidate with the feature's key factory; success feedback via `toast.success()`. Error toasts already happen globally in `lib/query/query-client.ts`.
- Errors are `ApiError` (`lib/api/api-error.ts`). Show them with `ErrorView`, or `getErrorMessage(error)`.
- New persisted keys go in `constants/storage.ts`.
- **Pagination, search, filtering and sorting happen on the server.** Pass them as query params and include them in the query key. Never fetch a full list and then slice, filter or sort it in memory. If the API can't do it, ask before building a client-side workaround.
- Paginated lists use `useInfiniteQuery` with `getNextPageParam`, and load more from FlashList's `onEndReached`, guarded by `hasNextPage && !isFetchingNextPage`.
- Search inputs are debounced with `useDebouncedValue` and `SEARCH_DEBOUNCE_MS` before they reach a query key. Trim the value. Use `placeholderData: keepPreviousData` so results don't flash while typing.
- Pass `signal` from the query function to the fetcher so superseded requests are cancelled.
- Use `select` in the query hook to shape data, instead of transforming it in components on every render.

## State

- More than one related piece of state in a component (filters, form fields, a toggle plus its value): use **one `useState` with an object**, or `useReducer` when the updates have rules. Don't stack several `useState` hooks for values that change together.
- Update object state with a functional updater that spreads the previous value: `setFilters((current) => ({ ...current, status }))`.
- Derive values instead of storing them. If it can be computed from props, state or query data, compute it (with `useMemo` if it's expensive); don't mirror it into state.
- Keep state as low in the tree as possible. Only lift it when siblings need it.

## Security

- Never put secrets (API keys with write access, signing keys, passwords) in the app or in `EXPO_PUBLIC_*` variables. Everything in the bundle is public.
- Tokens and personal data go in secure storage (`expo-secure-store`), never in MMKV, the persisted query cache, logs or error messages. Ask before adding a new place that stores user data.
- HTTPS only. Don't disable certificate checks or add plain-HTTP exceptions.
- Validate anything from outside the app (form input, deep-link params, route params) before using it: zod for forms, and parse/check route params (e.g. `Number.isInteger(id)`).
- Don't log request/response bodies, tokens or personal data. No `console.log` left in committed code.
- Never build URLs or queries by concatenating unvalidated user input. Pass values through axios `params`, or encode them.
- New dependencies must be well maintained and necessary. Say why you're adding one.

## UI

- Initial load: a skeleton shaped like the content. `Loader` only for inline spinners (e.g. loading more). Failure with no data: `ErrorView` with `onRetry`. No results: `EmptyView`. User feedback: `toast.success/error/info` from `@/lib/toast`.
- Lists that can grow use `FlashList` with `keyExtractor={keyExtractorById}`. No long `.map()` in a `ScrollView`.
- Style with NativeWind `className` and theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`...). No hex colors, no `StyleSheet.create` for new code.
- Build from `components/ui` first. Images use `Image` from `@/components/ui/image`. Icons come from `@/lib/icons` (add a file there following the existing pattern).
- Pressables without visible text get `accessibilityRole` and `accessibilityLabel`.

## Performance

- FlashList: `renderItem`, `keyExtractor` and separator components are defined outside the component (or memoized), never as new inline functions each render. Keep list items light; no queries inside list items.
- Don't create objects, arrays or functions inline in props of list items or memoized children. Hoist constants to module level; wrap callbacks passed down with `useCallback` when the child is memoized or is a list.
- Subscribe to zustand with narrow selectors (`useStore((state) => state.favoriteIds)`), never the whole store.
- Images: use `@/components/ui/image` (expo-image caching) and request appropriately sized images.
- Avoid effects for data flow. No `useEffect` to sync state from props or to fetch data; queries handle fetching.
- Heavy work (parsing, sorting large data) doesn't run during render. Move it to `select`, `useMemo`, or the server.
- Don't add a dependency for something a few lines of code can do.
- Links use typed routes: `href={{ pathname: "/characters/[id]", params: { id } }}`.

## Code style

- **No obvious comments.** Don't write comments that restate the code, JSDoc that repeats a name, `{/* */}` section labels, or commented-out code. Prefer clear names and small functions. A short comment is fine when the code genuinely needs explaining: a non-obvious reason, a workaround, a platform quirk, or a constraint someone could easily break.
- Function declarations for components, hooks and helpers (`export function X`). Arrow functions only for inline callbacks. Route files use `export default function`.
- One component per file. Helpers like `renderItem` sit outside the component, never inside it. No nested `renderX()` functions inside components; extract a sub-component with props.
- Descriptive names. Booleans `is/has/can...`, handler props `on...`. Fetchers `getX`, options `getXQueryOptions`, hooks `useX`.
- Files: components `PascalCase.tsx`, hooks `useCamelCase.ts`, everything else `kebab-case.ts`. `components/ui` and `components/primitives` keep upstream kebab-case.
- Constants `SCREAMING_SNAKE_CASE` in `constants/` or the feature's `constants.ts`. No magic numbers or strings.
- Imports: packages, blank line, `@/` aliases, then `./` relative. Use `@/` instead of `../../`. Import features through their `index.ts`.
- No `any`. No unused code or imports.

## Packages and native code

- npm only. Add React Native / Expo packages with `npx expo install <pkg>` so versions match the SDK.
- Adding a native package or changing `app.config.ts` requires `npx expo prebuild --clean` and a native rebuild. Say so in your reply.
- Don't edit `ios/` or `android/`; they are generated.

## Verify before you finish

1. `npm run typecheck` passes with 0 errors. If typed routes are stale, run the dev server once to regenerate `.expo/types`.
2. `npm run expo-check` passes when packages changed.
3. For larger changes, `npx expo export --platform ios --platform android --platform web --output-dir <tmp dir>` bundles all three platforms.
4. Report what you could not verify (e.g. you didn't run it on a device).
