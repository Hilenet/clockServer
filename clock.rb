require 'yaml'
require 'bundler'
Bundler.require

# time settings
list = YAML.load_file('time.yml')
# load tasks
everyday = list['everyday'] || []

# play wav in arg folder
def wavCall name
  file = Dir.glob(File.expand_path("wav/#{name}")+"/*.wav").sample
  `/usr/bin/aplay -q #{file}`
end

# set handler
everyday.each do |time|
  f_time = time.clone.insert(2, ':')
  Clockwork::every(1.days, "#{time}.everyday", at: f_time) do
    wavCall time
  end
end

# every in :00
Clockwork::every(1.hours, "sometime", if: lambda{|_| (rand(100)-1).negative?}) do 
  #wavCall 'sometime
  puts ("");
end


