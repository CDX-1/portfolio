import { type NoteRow, rowToNote } from "@/content/notes";
import { isOwner } from "@/lib/supabase/owner";
import { createClient } from "@/lib/supabase/server";
import NotesWall from "./notes-wall";

export default async function NotesSection() {
    const supabase = await createClient();
    const [{ data: userData }, notesRes] = await Promise.all([
        supabase.auth.getUser(),
        supabase
            .from("notes")
            .select(
                "id, sender_name, message, color, status, created_at, approved_at, doodle",
            )
            .order("created_at", { ascending: false })
            .limit(120),
    ]);

    const ownerAuthed = isOwner(userData.user);
    // Swallow "table does not exist" errors so the section still renders an
    // empty state before the migration has run.
    const rows = notesRes.error ? [] : (notesRes.data ?? []);
    const notes = (rows as NoteRow[])
        .filter((r) => (ownerAuthed ? true : r.status === "approved"))
        .map(rowToNote);

    return <NotesWall serverNotes={notes} isOwner={ownerAuthed} />;
}
