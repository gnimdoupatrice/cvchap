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
- Guest mode persists the document and AI credits in localStorage (`src/lib/cv/storage.ts`) — no account required to create/export.
- AI calls go through server functions in `src/lib/ai.functions.ts` → `src/lib/ai/gateway.server.ts`; never call the model from the browser.
- PDF export uses the browser print engine with A4 `@page` CSS so text stays vector/selectable (ATS-friendly).
- Optional portrait images remain embedded as local data URLs so guest CVs and print exports work without remote storage.
- The only active CV template is the editable HTML/CSS reproduction of “Français Simple Moderne Bleu”; keep its fixed 794 × 1123 A4 geometry so print and preview remain identical.
