require 'mongo'
require 'mongo_mapper'

configure do
  MongoMapper.database = 'tarefas'
end

require_relative 'tarefa'
