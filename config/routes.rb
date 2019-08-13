Rails.application.routes.draw do
  get 'rosui/checkpoint'
  root 'rosui#checkpoint'
  get 'rosui/teleop'

  root 'rosui#teleop'
  get 'rosui/index'
  root 'rosui#index'
  get 'welcome/final'
  root 'welcome#final'
end
