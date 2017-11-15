# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :parser,
  ecto_repos: [Parser.Repo]

# Configures the endpoint
config :parser, ParserWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bJ/naZzHXirz8mBekGCVNLGZC/1y8hmhVf3B3RMTfC8ap14rmdCRwvgwp0LNvlTw",
  render_errors: [view: ParserWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Parser.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :database,
  url: "ecto://ecto:elixir@localhost/parser"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
