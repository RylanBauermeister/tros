class Api::V1::SitePrefsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @site_prefs = SitePref.all
    render json: @site_prefs
  end

  def update
    @site_prefs = SitePref.find(params[:id])
    @site_prefs.update(prefs_params)
    render json: @site_prefs
  end

  private
  def prefs_params
    params.require(:site_pref).permit(:access_time, :swap_time, :compare_time, :array_size)
  end
end
