export class Task {
  constructor() {
    // Set up the "Add Note" button on the page
    this._setupAddNote()
    // And set up the "Remove Note" buttons on the page
    this._setupRemoveNote()
  }
  _setupAddNote() {
    // When add note is clicked, clone the top note
    $("#add-note").on("click", this._cloneNote)
  }
  _setupRemoveNote() {
    // When remove note is clicked, remove the appropriate row
    $("#notes").on("click", "a.remove-note", this._removeNote)
  }
  _removeNote(event) {
    // Find the target, find its parent row, and remove the whole thing
    $(event.currentTarget).parents(".note").remove()
  }
  _cloneNote() {
    // Clone the top entry
    var newEntry = $("#notes .note:first").clone()
    newEntry.find("input[type=text]").val("")
    newEntry.appendTo("#notes")
    newEntry.find("input[type=text]").focus()
  }
}
