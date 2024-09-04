get '/' do
  redirect '/tarefas'
end

get '/tarefas' do
  erb :tarefas
end
