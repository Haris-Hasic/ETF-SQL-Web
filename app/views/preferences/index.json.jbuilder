json.array!(@preferences) do |preference|
  json.extract! preference, :id
  json.url preference_url(preference, format: :json)
end
