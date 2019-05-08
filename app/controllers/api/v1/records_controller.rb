class Api::V1::RecordsController < ApplicationController

  def index
    @records = Record.all
    render json: @records
  end
  
end
