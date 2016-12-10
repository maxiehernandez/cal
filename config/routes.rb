Rails.application.routes.draw do
  root 'cal#index'
  get '/calculation' => 'cal#calculation'
end
