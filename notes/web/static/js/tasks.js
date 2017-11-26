export class Task {
  constructor() {
    // Set up the "Add Note" button on the page
    this._setupAddNote()
    // And set up the "Remove Note" buttons on the page
    this._setupRemoveNote()
  }
  _setupAddNote() {
    // When add entry is clicked, clone the top entry
    $("#add-note").on("click", this._cloneNote)
  }
  _setupRemoveNote() {
    // When remove entry is clicked, remove the appropriate row
    $("#notes").on("click", "a.remove-note", this._removeNote)
  }
  _removeNote(event) {
    // Find the target, find its parent row, and remove the whole thing
    $(event.currentTarget).parents(".note").remove()
  }
  _cloneNote() {
    // Clone the top entry
    var newEntry = $("#notes .note:first").clone()
    // Reset its value to blank
    newEntry.find("input[type=text]").val("")
    // And then throw it into the entry list
    newEntry.appendTo("#notes")
    // And then focus that text entry
    newEntry.find("input[type=text]").focus()
  }
}
