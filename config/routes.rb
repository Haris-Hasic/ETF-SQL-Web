Rails.application.routes.draw do
  
  root 'application#index'
  #get '*path' => 'application#index'
  
  resources :user_histories
  resources :preferences
  resources :connections
  resources :users
  
  get '/forgotten_password' => 'users#forgotten_password'
  post '/resetPassword' => 'user_reset_password#restart'
  get '/resetPassword' => 'user_reset_password#activate'
  
  resources :users do
	member do
		get :confirm_email
	end
  end
  
  get '/login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  get '/logout' => 'sessions#destroy'
  
  post '/console' => 'console#index'
  post '/dbconnect' => 'console#create'
  delete '/dbdisconnect' => 'console#destroy'
  
  post '/fileUpload' => 'upload#uploadFile'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  #root 'home#index'
  get '/home' => 'home#index'
  get '/' => 'home#index'
  # Example of regular route:

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
