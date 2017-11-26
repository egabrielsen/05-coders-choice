defmodule Notes.Repo.Migrations.CreateNote do
  use Ecto.Migration

  def change do
    create table(:notes) do
      add :title, :string
      add :description, :integer
      add :likes, :integer
      add :task_id, references(:tasks, on_delete: :nothing)

      timestamps()
    end

    create index(:notes, [:task_id])
  end
end
