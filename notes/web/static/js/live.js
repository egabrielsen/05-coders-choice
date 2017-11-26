import { Socket } from "phoenix"

export class Live {

  constructor() {
    // If the element expected doesn't exist on the page,
    // just exit out of the whole thing
    if (!$("#task-id").length) { return }
    // Set up channel for Tasks
    let taskChannel = this._setupTaskChannel()

    this._setupGraph()

    this._setupLikeButtons(taskChannel)
  }

  _createSocket() {
    // Open up a new websocket connection
    let socket = new Socket("/socket")
    // And then connect to it
    socket.connect()
  
    socket.onOpen(() => console.log("Connected"))
    // And return out the socket
    return socket
  }

  _setupTaskChannel() {
    // Call createSocket() function above and store the created socket
    let socket = this._createSocket()

    // And grab the id of the task
    let taskId = $("#task-id").val()

    let taskChannel = socket.channel("tasks:" + taskId)

    taskChannel.on("new_like", like => {
      // Update the liked item’s display

      this._updateGraph()
      this.updateDisplay(like.note_id)
    })

    taskChannel
      .join()
      .receive("ok", resp => { console.log("Joined") })
      .receive("error", reason => { console.log("Error: ", reason) })


    return taskChannel
  }

  updateDisplay(note_id) {
    // Iterate over each entry
    $.each($("li.note"), (index, item) => {
      // Store the current item
      let li = $(item)
      // If the entry ids match, update the number of likes for that element
      if (note_id == li.data("note-id")) {
        // Get the number of current likes, parse it as an integer, and add one
        let newLikes = +(li.find(".likes").text()) + 1
        // And update the display for that entry
        this._updateNoteLikes(li, newLikes)
      }
    })
  }

  _updateNoteLikes(li, newLikes) {
    // Find the .likes span and update it to whatever the new likes value is
    li.find(".likes").text(newLikes)
  }

  _setupLikeButtons(taskChannel) {
    // Set up our default click handler for likes
    $(".like").on("click", event => {
      event.preventDefault()
      // Find the containing list item
      let li = $(event.currentTarget).parents("li")
      // Grab the note id for what the user liked
      let noteId = li.data("note-id")
      console.log("liked" + noteId);

      let taskId = $("#task-id").val()

      taskChannel.push("new_like", { note_id: noteId })
      console.log("success")
    })
  }

  // Adapted from Google JS API
  _setupGraph() {
    google.load("visualization", "1", { packages: ["corechart"] })
    google.setOnLoadCallback(() => {
      this.chart = new google.visualization.PieChart(document.getElementById("my-chart"))
      this._updateGraph()
    })
  }

  _updateGraph() {
    let data = this._getGraphData()
    let convertedData = google.visualization.arrayToDataTable(data)
    this.chart.draw(convertedData, { title: "Task Overview", is3D: true })
  }

  _getGraphData() {
    var data = [["Note", "Likes"]]

    $.each($("li.note"), (index, item) => {
      let li    = $(item)
      let title = li.find(".title").text()
      let likes = +(li.find(".likes").text())
      data.push([title, likes])
    })

    return data
  }

}
