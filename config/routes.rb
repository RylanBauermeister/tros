Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/', to: "application#index"

  namespace :api do
    namespace :v1 do
      resources :records, only: [:index, :create, :destroy]
      resources :site_prefs, only: [:index, :update]
    end
  end

end
