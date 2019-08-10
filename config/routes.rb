Rails.application.routes.draw do
  get 'welcome/index'
  get 'rosui/home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :articles
  
  root 'welcome#index'
  root 'rosui#home'
end
