class Api::V1::RecordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @records = Record.all
    render json: @records
  end

  def create
    @record = Record.new(record_params)
    if @record.save
      render json: @record, status: :accepted
    else
      render json: { errors: @record.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @record = Record.find(params[:id])
    @record.delete()
  end


  private
  def record_params
    params.require(:record).permit(:sort_type, :accesses, :swaps, :compares, :access_time, :swap_time, :compare_time, :total_ms, :array_size)
  end

end
