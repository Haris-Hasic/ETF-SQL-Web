json.array!(@connections) do |connection|
  json.extract! connection, :id
  json.url connection_url(connection, format: :json)
end
