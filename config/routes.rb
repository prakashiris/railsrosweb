Rails.application.routes.draw do

  get 'rosui/teleop'

  root 'rosui#teleop'
  get 'rosui/_index'
  get 'rosui/checkpoint'
  get 'rosui/_reading'
  get 'welcome/final'
end
