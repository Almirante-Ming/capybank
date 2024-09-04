class Agenda
  include MongoMapper::Document

  key :nome, String, :required => true
  key :descricao, String, :required => true

  timestamps!
end
