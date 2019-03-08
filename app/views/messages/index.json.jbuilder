json.array!  @new_messages do |message|
  json.user_name message.user.name
  json.time      message.created_at
  json.content   message.content
  json.id        message.id
end
