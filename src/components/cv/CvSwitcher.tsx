import { useState } from "react";
import { Check, ChevronDown, Cloud, CloudOff, Copy, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CloudCV } from "@/lib/cv/cloud";

export type SyncState = "saved" | "saving" | "error" | "offline";

type Props = {
  cvs: CloudCV[];
  activeId: string | null;
  sync: SyncState;
  onSwitch: (id: string) => void;
  onCreate: () => void;
  onDuplicate: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
};

export function CvSwitcher({ cvs, activeId, sync, onSwitch, onCreate, onDuplicate, onRename, onDelete }: Props) {
  const active = cvs.find((c) => c.id === activeId);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState("");
  const SyncIcon = sync === "saving" ? Loader2 : sync === "saved" ? Cloud : CloudOff;
  const syncLabel = sync === "saving" ? "Enregistrement…" : sync === "saved" ? "Enregistré en ligne" : sync === "offline" ? "Hors ligne" : "Échec d’enregistrement";

  if (renaming) {
    return (
      <form className="flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); onRename(name); setRenaming(false); }}>
        <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={80} aria-label="Nom du CV"
          className="h-8 w-40 rounded-md border bg-card px-2 text-xs" onBlur={() => setRenaming(false)} />
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex min-w-0 items-center gap-1.5 rounded-lg border bg-card px-2 py-1 text-xs font-semibold shadow-soft" aria-label="Mes CV">
        <SyncIcon className={`h-3.5 w-3.5 shrink-0 ${sync === "saved" ? "text-primary" : sync === "saving" ? "animate-spin text-muted-foreground" : "text-destructive"}`} aria-label={syncLabel} />
        <span className="max-w-28 truncate sm:max-w-44">{active?.name ?? "Mon CV"}</span>
        <ChevronDown className="h-3 w-3 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Mes CV · {syncLabel}</DropdownMenuLabel>
        {cvs.map((c) => (
          <DropdownMenuItem key={c.id} onSelect={() => c.id !== activeId && onSwitch(c.id)} className="text-xs">
            <Check className={`h-3.5 w-3.5 ${c.id === activeId ? "opacity-100" : "opacity-0"}`} />
            <span className="truncate">{c.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onCreate} className="text-xs"><Plus className="h-3.5 w-3.5" />Nouveau CV</DropdownMenuItem>
        <DropdownMenuItem onSelect={onDuplicate} disabled={!active} className="text-xs"><Copy className="h-3.5 w-3.5" />Dupliquer ce CV</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => { setName(active?.name ?? ""); setRenaming(true); }} disabled={!active} className="text-xs"><Pencil className="h-3.5 w-3.5" />Renommer</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => { if (window.confirm(`Supprimer « ${active?.name} » ? Cette action est définitive.`)) onDelete(); }} disabled={!active || cvs.length < 2} className="text-xs text-destructive"><Trash2 className="h-3.5 w-3.5" />Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
