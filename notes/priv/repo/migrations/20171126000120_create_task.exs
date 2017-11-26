defmodule Notes.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :completed, :boolean, default: false, null: false
      add :message, :string
      add :date, :string

      timestamps()
    end
  end
end
