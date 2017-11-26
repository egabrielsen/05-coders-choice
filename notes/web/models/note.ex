defmodule Notes.Note do
  use Notes.Web, :model

  schema "notes" do
    field :title, :string
    field :description, :string
    field :likes, :integer, default: 0
    belongs_to :task, Notes.Task, foreign_key: :task_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :description, :task_id, :likes])
    |> validate_required([:title])
  end
end
