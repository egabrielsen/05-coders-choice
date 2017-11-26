defmodule Notes.TaskController do
  use Notes.Web, :controller

  alias Notes.Task
  alias Notes.Note

  def index(conn, _params) do
    tasks = Repo.all(Task)
    render(conn, "index.html", tasks: tasks)
  end

  def new(conn, _params) do
    changeset = Task.changeset(%Task{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"task" => task_params}) do
    case create_poll(task_params) do
      {:ok, _poll} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: task_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    note_query = from n in Note, order_by: [asc: n.id]
    inspect note_query
    task_query = from t in Task, preload: [notes: ^note_query]
    task       = Repo.get!(task_query, id)
    render(conn, "show.html", task: task)
  end

  def edit(conn, %{"id" => id}) do
    task = Repo.get!(Task, id)
    changeset = Task.changeset(task)
    render(conn, "edit.html", task: task, changeset: changeset)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Repo.get!(Task, id)
    changeset = Task.changeset(task, task_params)

    case Repo.update(changeset) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: task_path(conn, :show, task))
      {:error, changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Repo.get!(Task, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: task_path(conn, :index))
  end

  # Private Functions

  defp create_poll(task_params) do
    Repo.transaction fn ->
      changeset = Task.changeset(%Task{}, task_params)

      case Repo.insert(changeset) do
        {:ok, task} ->
          Enum.map task_params["notes"], fn note ->
            note = Note.changeset(%Note{}, %{ title: note, task_id: task.id })
            Repo.insert! note
          end
        {:error, changeset} ->
          Repo.rollback changeset
      end
    end
  end
end
