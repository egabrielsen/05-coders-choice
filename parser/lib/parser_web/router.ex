defmodule ParserWeb.Router do
  use ParserWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ParserWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/parser", ParserController, :index

  end

  # Other scopes may use custom stacks.
  # scope "/api", ParserWeb do
  #   pipe_through :api
  # end
end
