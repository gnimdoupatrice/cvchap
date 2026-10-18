<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## CV platform architecture
- CV data model lives in `src/lib/cv/types.ts`; templates render from it only, so new features (ATS score, application pack, interview simulator) plug in as new modules reading the same `CV` type.
- Discovery mode only persists sample/layout choices; content editing, AI and export require a session. Local documents and trial counters use account-scoped keys to prevent accidental cross-account loading.
- AI calls go through server functions in `src/lib/ai.functions.ts` → `src/lib/ai/gateway.server.ts`; never call the model from the browser.
- PDF export uses the browser print engine with A4 `@page` CSS so text stays vector/selectable (ATS-friendly).
- Optional portrait images remain embedded as local data URLs so guest CVs and print exports work without remote storage.
- All catalogue templates retain their fixed A4 geometry; the shared TemplateLayout adapter applies document typography and spacing without changing template artwork, so print and preview remain identical.
- Calibrate targeted template columns in their native coordinate space and mark transformed columns with `data-a4-column`; this preserves artwork while allowing independent overflow checks.
- Document layout settings are normalized in the shared CV layout module; optimization measures rendered text (including clipped and transformed columns) rather than root scroll height, because fixed-height templates hide overflow.
- Additional CV templates live in `src/components/cv/templates-new.tsx` (dispatched from `templates.tsx`) so existing template files stay untouched; sample portraits are bundled under `src/assets/cv/`.
- Auth uses the configured email/password client via `src/lib/supabase.ts`; ContentGate intercepts editing intent before input, with an editor mutation guard and authenticated AI server middleware as defense in depth. Template/layout exploration stays public.
- Existing account drafts take priority over discovery samples on sign-in; legacy unowned drafts are never silently assigned to an account because ownership cannot be established.
