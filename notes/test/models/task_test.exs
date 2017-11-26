defmodule Notes.TaskTest do
  use Notes.ModelCase

  alias Notes.Task

  @valid_attrs %{completed: true, date: "some date", message: "some message", title: "some title"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Task.changeset(%Task{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Task.changeset(%Task{}, @invalid_attrs)
    refute changeset.valid?
  end
end
