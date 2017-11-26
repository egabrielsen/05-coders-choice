defmodule Notes.Task do
  use Notes.Web, :model

  schema "tasks" do
    field :title, :string
    field :completed, :boolean, default: false
    field :message, :string
    field :date, :string

    has_many :notes, Notes.Note, on_delete: :delete_all

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :completed, :message, :date])
    |> validate_required([:title, :completed, :message, :date])
  end
end
