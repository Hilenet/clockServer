require 'net/http'
require 'json'
require 'uri'
require 'sinatra'
require 'sinatra/reloader'

set :public_folder, 'docs/'

get '/' do
  redirect to '/index.html'
end

get '/weather' do
  content_type :json
  url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=250010'
  res = JSON.parse Net::HTTP.get URI.parse url
  today = res["forecasts"][0]
  tomorrow = res['forecasts'][1]
  dat = {
    today: {
      weather: today['telop'],
      temperature: nil,
      por: nil
    }, 
    tomorrow: {
      weather: tomorrow['telop'],
      temperature: (tomorrow['temperature']['min']['celsius'] + tomorrow['temperature']['max']['celsius']).to_i()/2,
      por: nil
    }
  }
  .to_json
end

