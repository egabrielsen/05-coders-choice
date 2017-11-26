defmodule Notes.TaskChannel do
  use Phoenix.Channel

  alias Notes.Repo
  alias Notes.Note

  def join("tasks:" <> task_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("new_like", %{"note_id" => note_id}, socket) do
    IO.puts "called handle in"
    note     = Repo.get(Note, note_id)
    changeset = Note.changeset(note, %{likes: (note.likes + 1)})
    case Repo.update(changeset) do
      {:ok, note} ->
        IO.puts "Success"
        broadcast!(socket, "new_like", %{"note_id" => note.id})
        {:noreply, socket}
      {:error, _changeset} ->
        IO.puts "Error"
        {:error, %{reason: "Failed to like"}}
    end
  end
end
