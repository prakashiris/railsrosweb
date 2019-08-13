Rails.application.routes.draw do

  get 'rosui/home'

  root 'rosui#home'
  get 'rosui/index'
  root 'rosui#index'
end
