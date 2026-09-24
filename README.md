# Expo Boilerplate

Ontik's starting point for React Native apps built with Expo. Start every new app from here. This guide takes you from a fresh laptop to shipping your first feature, and sets out the rules the team follows so every app we build looks and works the same.

Repository: [github.com/thekawsarhossain/expo-boilerplate](https://github.com/thekawsarhossain/expo-boilerplate). Found a problem or have an idea? [Open an issue](https://github.com/thekawsarhossain/expo-boilerplate/issues/new).

The boilerplate comes with a small working demo built on the free [Rick and Morty API](https://rickandmortyapi.com): a searchable character grid, a detail screen and a favorites list. It shows every pattern in this guide in real code. Read it, copy from it, and delete it once your own features are in place.

## Contents

1. [The stack](#1-the-stack)
2. [Set up your machine](#2-set-up-your-machine)
3. [Run the app](#3-run-the-app)
4. [How the project is organized](#4-how-the-project-is-organized)
5. [How data works](#5-how-data-works)
6. [Build your first feature, step by step](#6-build-your-first-feature-step-by-step)
7. [Rules we follow](#7-rules-we-follow)
8. [Everyday commands](#8-everyday-commands)
9. [Troubleshooting](#9-troubleshooting)
10. [Before you open a pull request](#10-before-you-open-a-pull-request)

---

## 1. The stack

| Concern | Tool | Why |
|---|---|---|
| Framework | [Expo SDK 54](https://docs.expo.dev), [React Native 0.81](https://reactnative.dev) (New Architecture) | One codebase for iOS, Android and web |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routes, with a typed `href` for every link |
| Server data | [TanStack Query v5](https://tanstack.com/query/latest) | Caching, loading and error states, refetching, pagination |
| Offline cache | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (localStorage on web) | The query cache survives app restarts |
| HTTP | [axios](https://axios-http.com) | One configured client, with interceptors for auth and errors |
| Client state | [zustand](https://zustand.docs.pmnd.rs) + [MMKV](https://github.com/mrousavy/react-native-mmkv) | Small stores that persist between launches |
| Styling | [NativeWind v4](https://www.nativewind.dev) (Tailwind CSS) | `className` styling on every platform, light and dark themes |
| UI kit | [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables) | Button, Input, Card, Skeleton and more, already in `components/ui` |
| Lists | [FlashList v2](https://shopify.github.io/flash-list/) | Fast recycling lists. Use it for every list that can grow |
| Forms | [react-hook-form](https://react-hook-form.com) + [zod v4](https://zod.dev) | Typed forms with schema validation |
| Language | TypeScript (strict) | Every file is `.ts` or `.tsx` |

If any of these are new to you, read the official "getting started" page for Expo Router, TanStack Query and NativeWind before you write code. Almost everything else in the codebase builds on those three.

---

## 2. Set up your machine

You need:

- **Node.js 20.19.4 or newer.** Expo SDK 54 won't install on older versions. Check with `node -v`. [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) makes switching versions easy.
- **npm.** It comes with Node. Use npm only, not yarn, pnpm or bun, so everyone shares one lockfile (`package-lock.json`).
- **For iOS (macOS only):** Xcode from the App Store, then the [iOS Simulator setup](https://docs.expo.dev/workflow/ios-simulator/).
- **For Android:** Android Studio and an emulator ([setup guide](https://docs.expo.dev/workflow/android-studio-emulator/)).
- **Editor:** VS Code. Accept the recommended extensions when it offers them. The project settings and snippets are in `.vscode/`.

---

## 3. Run the app

```shell
git clone https://github.com/thekawsarhossain/expo-boilerplate.git my-app
cd my-app
npm install
cp .env.example .env
npm run ios        # or: npm run android
```

`npm run ios` and `npm run android` compile the native app, install it on the simulator and start the dev server. The first build takes a few minutes. After that, JavaScript changes reload instantly.

Once the native app is installed, you usually only need the dev server:

```shell
npm run dev        # then press i (iOS), a (Android) or w (web)
```

### When do I need to rebuild the native app?

Rebuild with `npx expo prebuild --clean` and then `npm run ios` / `npm run android` whenever you:

- install or update a package that includes native code (most `expo-*` packages, MMKV, reanimated, ...)
- change `app.config.ts` (app name, icons, splash, plugins, permissions)
- upgrade the Expo SDK

For JavaScript and TypeScript changes you never need to rebuild.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | `https://rickandmortyapi.com/api` | Base URL for every API request |

- Only variables prefixed with `EXPO_PUBLIC_` reach the app. They're built into the bundle, so **never put secrets in them**.
- Read them only in `config/env.ts`, and import `env` from there everywhere else.
- `.env` is git-ignored. When you add a variable, add it to `.env.example` too.

---

## 4. How the project is organized

```
.
├── app/                          Routes. Each route file IS a screen
│   ├── _layout.tsx               Root: providers, theme, navigation stack, toasts
│   ├── (tabs)/                   Bottom tabs
│   │   ├── _layout.tsx
│   │   ├── index.tsx             Characters screen
│   │   ├── favorites.tsx         Favorites screen
│   │   └── settings.tsx          Settings screen
│   └── characters/[id].tsx       Character detail screen
│
├── components/                   UI only. Nothing sits directly in this folder
│   ├── primitives/               Unstyled building blocks (behavior + accessibility)
│   ├── ui/                       Styled design-system components (Button, Input, Card, Skeleton, ...)
│   ├── shared/                   Generic, domain-free app components
│   │                             (ScreenHeader, Loader, ErrorView, EmptyView, SearchInput, toast/, ...)
│   └── screens/                  Sub-components of each screen, one folder per screen
│       ├── characters/           CharacterFilters, CharacterGrid, CharacterCard, ... (+ skeletons)
│       ├── character-detail/     CharacterDetails, CharacterHero, EpisodeRow, ... (+ skeletons)
│       └── settings/             SettingsSection, SettingsRow, ThemeSelector, AppInfoCard, ...
│
├── features/                     Domain logic, one folder per feature. No components
│   ├── characters/
│   │   ├── api/                  One file per request: fetcher + queryOptions + hook
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── index.ts              The feature's public API. Import from here only
│   ├── episodes/
│   └── favorites/                store.ts: zustand store persisted to MMKV
│
├── providers/                    App-wide providers (QueryProvider)
├── hooks/                        Generic hooks (useDebouncedValue, useRefreshByUser, ...)
├── lib/                          Infrastructure
│   ├── api/                      http-client.ts (axios), api-error.ts
│   ├── query/                    Query client, SQLite persister, online/focus managers
│   ├── storage/                  MMKV + zustand adapter
│   ├── theme/                    Theme switch crossfade (snapshot + transition store)
│   ├── toast/                    toast.success() / toast.error() / toast.info()
│   ├── utils/                    Pure helpers (cn, keyExtractorById, pagination, ...)
│   └── icons/                    Lucide icons wired up for className
├── config/                       env.ts, app.ts
├── constants/                    App-wide constants (api, query, storage keys, ui, theme)
├── types/                        Types shared across features
└── assets/                       Icons, splash, fonts
```

### Where does my code go?

This table is the one to learn. Most code review comments come down to "this is in the wrong folder".

| You're writing... | It goes in |
|---|---|
| A new screen | A route file in `app/`. The route file owns the screen's state and hooks and puts the sub-components together |
| A piece of one screen | `components/screens/<screen>/` |
| A piece another screen also needs | It stays under the screen that owns it; the other screen imports it from there |
| A generic component with no domain knowledge | `components/shared/` |
| A reusable styled design-system component | `components/ui/` |
| A loading skeleton | `<Component>Skeleton.tsx` next to the component it copies, built from `ui/skeleton` |
| An API call | `features/<feature>/api/<verb>-<resource>.ts` |
| A domain type or constant | `features/<feature>/types.ts` / `constants.ts` |
| Client-only state (favorites, drafts, filters to remember) | `features/<feature>/store.ts` |
| A hook with no domain knowledge | `hooks/` |
| A pure helper function | `lib/utils/` |
| A constant used across features | `constants/` |
| A type used across features | `types/` |

Three rules behind that table:

1. **`app/` files are screens; `components/screens/` holds only their pieces.** Never add a component whose only job is to wrap a whole screen.
2. **`components/shared/` is only for things with no domain knowledge.** A `CharacterCard` is not shared, even when two screens use it.
3. **`features/` holds no components.** It's data, types, constants and client state only.

---

## 5. How data works

### Server state vs client state

- **Server state** is anything the API owns (characters, users, orders...). It lives **only** in TanStack Query. Never copy it into zustand or `useState`.
- **Client state** is anything only this device knows (favorites, theme, a draft). It lives in a zustand store persisted to MMKV, or in `useState` if it doesn't need to survive navigation.

The favorites feature shows both working together: the store keeps only character IDs, and the Favorites screen fetches those characters through TanStack Query.

### The request path

```
app/(tabs)/index.tsx                         screen: owns search + filter state
  └─ components/screens/characters/CharacterResultsContent.tsx
       └─ useCharacters(filters)              features/characters/api/get-characters.ts
            └─ getCharactersQueryOptions      query key + fetcher + paging rules
                 └─ getCharacters             the request
                      └─ httpClient           lib/api/http-client.ts (axios)
```

Components only call hooks from `features/*`. They never call axios or a fetcher directly.

### Anatomy of an API file

Every file in `features/<feature>/api/` exports three things, in this order:

```ts
export async function getCharacter(id: number, signal?: AbortSignal): Promise<Character> {
  const { data } = await httpClient.get<Character>(`/character/${id}`, { signal });
  return data;
}

export function getCharacterQueryOptions(id: number) {
  return queryOptions({
    queryKey: characterKeys.detail(id),
    queryFn: ({ signal }) => getCharacter(id, signal),
    enabled: Number.isInteger(id),
  });
}

export function useCharacter(id: number) {
  return useQuery(getCharacterQueryOptions(id));
}
```

1. **Fetcher** (`getX`): a plain async function with no React in it. Pass `signal` through so TanStack can cancel requests that are no longer needed.
2. **Query options** (`getXQueryOptions`): the query key and the fetcher, kept in one place. Reuse it for `prefetchQuery`, `getQueryData` and `setQueryData`, so a key is never typed out twice.
3. **Hook** (`useX`): the only thing components use.

Query keys come from one factory per feature (`features/<feature>/api/keys.ts`). Invalidating `characterKeys.all` refreshes everything in that feature.

### Writing data (mutations)

The demo API is read-only, so there's no mutation in the code yet. When you add one, follow this shape:

```ts
export async function updateProfile(input: UpdateProfileInput): Promise<Profile> {
  const { data } = await httpClient.patch<Profile>("/me", input);
  return data;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      toast.success("Profile updated");
    },
  });
}
```

You don't need to handle errors yourself: every failed mutation already shows an error toast (see below).

### Loading, errors and empty states

| Situation | Show |
|---|---|
| First load of a screen or list | A skeleton shaped like the content (`CharacterGridSkeleton`, `CharacterDetailsSkeleton`) |
| Loading more (pagination) | `<Loader variant="inline" size="small" />` |
| Request failed and there's nothing to show | `<ErrorView error={error} onRetry={refetch} />` |
| Request succeeded but returned nothing | `<EmptyView title="..." description="..." />` |
| Background refresh failed while cached data is on screen | Nothing: an error toast appears automatically |
| Something the user should know about (saved, copied, failed) | `toast.success()` / `toast.error()` / `toast.info()` |

Every error reaching a component has already been turned into an `ApiError` (`status`, `isNotFound`, `isNetworkError`). `getErrorMessage(error)` gives you a friendly sentence, and `ErrorView` calls it for you.

### Caching and offline

- TanStack Query caches responses in memory and refetches in the background when data is older than 5 minutes (`constants/query.ts`).
- `providers/QueryProvider.tsx` also saves that cache to SQLite, so the next launch shows data straight away, even offline. Cached data expires after 24 hours and is cleared when the app version changes.
- When the device goes offline, queries pause and retry once it reconnects. They also refresh when the app comes back to the foreground.
- **Settings → Clear cached data** wipes the cache, which is useful when testing.

---

## 6. Build your first feature, step by step

Example: a **Locations** tab listing Rick and Morty locations with infinite scroll. Build it in this order and each step type-checks before you start the next.

**1. Types.** `features/locations/types.ts`

```ts
export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};
```

**2. Query keys.** `features/locations/api/keys.ts`

```ts
export const locationKeys = {
  all: ["locations"] as const,
  lists: () => [...locationKeys.all, "list"] as const,
};
```

**3. The API file.** `features/locations/api/get-locations.ts`: the fetcher, then `getLocationsQueryOptions` built with `infiniteQueryOptions`, then `useLocations`. Copy `features/characters/api/get-characters.ts` and adapt it; the paging helpers (`FIRST_PAGE`, `getNextPageNumber`, `createEmptyPage`) already exist.

**4. Public API.** `features/locations/index.ts` exports only what screens need: the hook and the types.

**5. Sub-components.** `components/screens/locations/`: `LocationRow.tsx` and `LocationRowSkeleton.tsx` next to each other. Build them from `components/ui` and style them with `className`.

**6. The screen.** `app/(tabs)/locations.tsx`: call `useLocations()`. Show the skeleton while `isPending`, `ErrorView` on error, and otherwise a `FlashList` of `LocationRow` with `keyExtractor={keyExtractorById}` and `onEndReached` loading the next page.

**7. The tab.** Add a `<Tabs.Screen name="locations" ... />` in `app/(tabs)/_layout.tsx`, with an icon from `lib/icons` (add one there if needed, following the existing files).

**8. Check it.** `npm run typecheck`, then try it on iOS, Android and web: first load, pull to refresh, scroll to the end, airplane mode, and an app restart while offline.

---

## 7. Rules we follow

The same rules, condensed for AI coding agents, are in [`AGENTS.md`](AGENTS.md). `CLAUDE.md` imports it, so Claude Code, Codex, Cursor and similar tools follow the same structure. When a rule here changes, update `AGENTS.md` in the same pull request.

### Priorities

When two rules pull against each other: **security first, then performance, then everything else** (shorter code, convenience, cleverness).

### Code style

- **No obvious comments.** Don't write comments that repeat what the code already says, JSDoc that restates a name, or commented-out code. Clear names and small functions come first. A comment is welcome when the code genuinely needs explaining: a non-obvious reason, a workaround, a platform quirk or a constraint someone could easily break.
- **Name things by what they are.** `isRefreshingByUser`, not `flag`; `getCharactersByIds`, not `fetchData2`. Booleans start with `is`, `has` or `can`. Event handler props start with `on`.
- **Function declarations** for components, hooks and helpers: `export function CharacterCard(...)`. Arrow functions for inline callbacks. Route files use `export default function`.
- **One component per file.** Small private helpers the component uses (like a `renderItem`) may sit in the same file, defined **outside** the component, never inside it.
- **Imports:** packages first, then a blank line, then `@/...` aliases, then relative `./...` imports. Always use `@/` aliases instead of `../../`.
- **Import a feature through its `index.ts`** (`@/features/characters`), never from its inner files.
- **No magic values.** Timeouts, page sizes, storage keys and counts go in `constants/`.
- **No `any`.** If you're fighting the types, the data shape is probably wrong. Fix it in `types.ts`.

### File naming

| Kind | Style | Example |
|---|---|---|
| Components | `PascalCase.tsx` | `CharacterCard.tsx` |
| Hooks | `useCamelCase.ts` | `useDebouncedValue.ts` |
| Everything else | `kebab-case.ts` | `http-client.ts`, `get-characters.ts` |
| API files | `<verb>-<resource>.ts` | `get-character.ts`, `update-profile.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `SEARCH_DEBOUNCE_MS` |

`components/ui/` and `components/primitives/` keep their upstream `kebab-case` file names.

### UI

- **Style with `className`** (NativeWind). Use theme colors (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`...) instead of hex values, so light and dark mode both work without extra code.
- **Build from `components/ui`** before writing anything new.
- **Every long list uses `FlashList`.** Don't render a long `.map()` inside a `ScrollView`.
- **Images use `Image` from `components/ui/image`** (expo-image: cached, supports `className`).
- **Accessibility:** pressable elements get an `accessibilityRole` and an `accessibilityLabel` when they have no visible text.
- **Check every screen in both themes and on all three platforms** before you call it done.

### State

- **Related state goes in one object.** If a component needs several values that change together (filters, form fields), use one `useState` with an object, or `useReducer` when the updates have rules, not a stack of `useState` hooks. Update it with a functional updater: `setFilters((current) => ({ ...current, status }))`. The Characters screen (`app/(tabs)/index.tsx`) shows the pattern.
- **Derive, don't duplicate.** If a value can be computed from props, state or query data, compute it (with `useMemo` if it's expensive) instead of storing it.
- Keep state as low in the tree as possible.

### Data

- Server data lives only in TanStack Query. Client state lives in zustand/MMKV or `useState`.
- Components never import `httpClient` or call a fetcher.
- **Pagination, search, filtering and sorting run on the server.** Send them as query params and put them in the query key. Never download a whole list and slice, filter or sort it in memory. If the API can't do it, discuss it before building a workaround.
- **Search is debounced.** Run the input through `useDebouncedValue(text.trim(), SEARCH_DEBOUNCE_MS)` before it reaches a query, and use `placeholderData: keepPreviousData` so results don't flicker.
- Paginated lists use `useInfiniteQuery` and load more from FlashList's `onEndReached`, guarded by `hasNextPage && !isFetchingNextPage`.
- Persisted keys (MMKV, the query cache) are listed in `constants/storage.ts`.

### Performance

- FlashList `renderItem`, `keyExtractor` and separators are defined outside the component, not recreated every render. No queries inside list items.
- Don't pass new inline objects, arrays or functions to list items or memoized children. Hoist constants to module level and use `useCallback` / `useMemo` for what you pass down.
- Read zustand stores through narrow selectors (`useStore((state) => state.favoriteIds)`), never the whole store.
- Shape data with the query's `select` or on the server, not in render.
- No `useEffect` for fetching or for copying props into state.
- Don't add a dependency for something a few lines of code can do.

### Security

- Nothing secret ships in the app. Every `EXPO_PUBLIC_*` value and every string in the bundle is public.
- Tokens and personal data go in `expo-secure-store`, never in MMKV, the persisted query cache, logs or error messages.
- HTTPS only, with certificate checks left on.
- Validate everything from outside the app: form input with zod, and route and deep-link params before you use them.
- No `console.log` in committed code, and never log request bodies, tokens or personal data.
- Pass user input through axios `params` or encode it; never paste it into URLs by hand.
- Every new dependency must be well maintained and actually needed. Say why in the pull request.

---

## 8. Everyday commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (press `i`, `a` or `w`) |
| `npm run ios` / `npm run android` | Build and run the native app |
| `npm run typecheck` | Type-check the whole project |
| `npm run expo-check` | Check installed packages against the Expo SDK |
| `npm run build:web` | Export the static web build to `dist/` |
| `npx expo install <package>` | Add a package at the version that matches our Expo SDK. Use this instead of `npm install` for anything React Native |
| `npx expo prebuild --clean` | Regenerate the native `ios/` and `android/` folders |
| `npx expo-doctor` | Check the project for common setup problems |

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails with an engine error | Your Node is too old. Use 20.19.4 or newer |
| A new package crashes with "native module not found" | It includes native code. Run `npx expo prebuild --clean` and rebuild |
| Styles don't apply after changing `tailwind.config.ts` or `global.css` | Restart with a clean cache: `npx expo start -c` |
| TypeScript says a route like `/characters/[id]` doesn't exist | Start the dev server once (`npm run dev`) so it regenerates the typed routes |
| The app shows old data | Pull to refresh, or Settings → Clear cached data |
| Anything else odd after pulling changes | `npm install`, then `npx expo start -c`, then rebuild the native app if `package.json` changed |

---

## 10. Before you open a pull request

- [ ] `npm run typecheck` passes
- [ ] `npm run expo-check` passes, if you added or updated packages
- [ ] Tried on iOS, Android and web, in light and dark mode
- [ ] Loading (skeleton), error, empty and offline states all look right
- [ ] Files are in the right folders (see [Where does my code go?](#where-does-my-code-go))
- [ ] No obvious comments, no `any`, no magic values, no unused code, no `console.log`
- [ ] Pagination, search and filtering run on the server; search is debounced
- [ ] Related state is one object, not a stack of `useState` hooks
- [ ] No secrets, tokens or personal data in the bundle, MMKV, the query cache or logs
- [ ] New environment variables are in `.env.example`
- [ ] The pull request description explains **why**, plus screenshots for UI changes

## License

See [LICENSE](LICENSE).
