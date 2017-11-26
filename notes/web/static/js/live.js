import { Socket } from "phoenix"

export class Live {
  constructor() {
    // If the element expected doesn't exist on the page,
    // just exit out of the whole thing
    if (!$("#task-id").length) { return }
    // Set up channel for Tasks
    let taskChannel = this._setupTaskChannel()

    this._setupLikeButtons(taskChannel)
  }

  _createSocket() {
    // Open up a new websocket connection
    let socket = new Socket("/socket")
    // And then connect to it
    socket.connect()
    // When we successfully open the connection, log out to the console that
    // we succeeded.
    socket.onOpen(() => console.log("Connected"))
    // And return out the socket
    return socket
  }

  _setupTaskChannel() {
    // Call our createSocket() function above and store the created socket
    let socket = this._createSocket()

    // And grab the id of the poll we're subscribing to
    let taskId = $("#task-id").val()
    // Next, specify that we want to join a polls channel of the polls: with the poll id.
    // Remember our code in PollChannel.ex that looked like: "polls:" <> poll_id
    let taskChannel = socket.channel("tasks:" + taskId)
    // Finally, join the channel we created. On success, let the console know that we joined.
    // On failure, tell us why it errored out.

    taskChannel.on("new_like", like => {
      // Update the voted item’s display
      console.log("On")
      this.updateDisplay(like.note_id)
    })

    taskChannel
      .join()
      .receive("ok", resp => { console.log("Joined") })
      .receive("error", reason => { console.log("Error: ", reason) })
    // Finally, return the whole channel we've created; we'll need that to push
    // messages out later.

    return taskChannel
  }

  updateDisplay(note_id) {
    // Iterate over each entry
    $.each($("li.note"), (index, item) => {
      // Store the current item
      let li = $(item)
      // If the entry ids match, update the number of votes for that element
      if (note_id == li.data("note-id")) {
        // Get the number of current votes, parse it as an integer, and add one
        let newLikes = +(li.find(".likes").text()) + 1
        // And update the display for that entry
        this._updateNoteLikes(li, newLikes)
      }
    })
  }

  _updateNoteLikes(li, newLikes) {
    // Find the .votes span and update it to whatever the new votes value is
    li.find(".likes").text(newLikes)
  }

  _setupLikeButtons(taskChannel) {
    // Set up our default click handler for votes
    $(".like").on("click", event => {
      event.preventDefault()
      // Find the containing list item
      let li = $(event.currentTarget).parents("li")
      // Grab the entry id for what the user voted on
      let noteId = li.data("note-id")
      console.log("liked" + noteId);
      // And the current poll
      let taskId = $("#task-id").val()
      // And then push a new_vote message with the entry id onto the channel
      taskChannel.push("new_like", { note_id: noteId })
      console.log("success")
    })
  }

}
