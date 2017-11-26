defmodule Notes.NoteTest do
  use Notes.ModelCase

  alias Notes.Note

  @valid_attrs %{description: 42, title: "some title"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Note.changeset(%Note{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Note.changeset(%Note{}, @invalid_attrs)
    refute changeset.valid?
  end
end
